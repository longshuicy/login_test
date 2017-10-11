var express = require('express');
var passport = require('passport');
var Strategy = require('passport-flickr').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();
var fetch = require('node-fetch');

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    consumerKey: config.flickr.consumer_key,
    consumerSecret: config.flickr.consumer_secret,
    callbackURL: 'http://localhost:3000/login/flickr/return'
  },
  function(token, tokenSecret, profile, cb) {
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    return cb(null,profile);
  }));

router.get('/login/flickr', passport.authorize('flickr'));
router.get('/login/flickr/return', passport.authorize('flickr', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'flickr', req.account.token, redis.print);
    res.send('<script>window.close()</script>');
  }
);

router.post('/flickrQuery',function(req,res){
  query = req.body.query;
  //console.log(query);
  client.hgetall(req.sessionID, function (err, obj){
    if (err){
      var problem = {status: "Fail", err:err};
      res.send(err);
      res.end();
    }
    else{
        console.log(obj.flickr_AT);
		console.log(obj.flickr_TS);
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'twtaccesstokenkey':obj.flickr_AT,
            'twtaccesstokensecret':obj.flickr_TS,
        }
      
        fetch('http://localhost:8080/graphql', {method:'POST',
          headers: headers,
          body: JSON.stringify({"query":query })
          }).then(function(response){
            return response.text();
        }).then(function(responseBody){

            /*fs.writeFile("/Users/zongyiwang/Desktop/query_result.json", responseBody, function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            }); */

            var send = {status: 'OK', answer: responseBody};
            res.send(send);
        });  
    }
  });
});

module.exports = router;
