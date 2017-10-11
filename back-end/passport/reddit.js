var express = require('express');
var passport = require('passport');
var Strategy = require('passport-reddit').Strategy;
var router = express.Router();
var config = require('../config.js');
var fetch = require('node-fetch');
var fs = require('fs');
var redis = require('redis');
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.reddit.client_id,
    clientSecret: config.reddit.client_secret,
    callbackURL: 'http://localhost:3000/login/reddit/return',
    state: 'foo',

  },
  function(accessToken, refreshToken, profile, cb) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return cb(null, profile);
  }));

router.get('/login/reddit', passport.authorize('reddit',{scope:['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'], duration: 'permanent'}));
router.get('/login/reddit/return', passport.authorize('reddit', {failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'reddit', req.account.accessToken, redis.print);
    res.send('<script>window.close()</script>');
  }
);

router.post('/redditQuery',function(req,res){
  query = req.body.query;
  client.hgetall(req.sessionID, function (err, obj){

    if (err){
      var problem = {status: "Fail", err:err};
      res.send(err);
      res.end();
    }
    else{
        console.log("I get token!!!!")
        console.log(obj.reddit)
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'redditaccesstoken':obj.reddit,

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
