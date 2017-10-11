var express = require('express');
var passport = require('passport');
var Strategy = require('passport-instagram').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();
var fetch = require('node-fetch');

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.instagram.client_id,
    clientSecret: config.instagram.client_secret,
    callbackURL: 'http://localhost:3000/login/instagram/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.refreshToken = refreshToken;
    profile.accessToken = accessToken;
    return cb(null,profile);
  }));

router.get('/login/instagram', passport.authorize('instagram'));
router.get('/login/instagram/return', passport.authorize('instagram', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'instagram', req.account.accessToken, redis.print);
    res.send('<script>window.close()</script>');
  }
);

router.post('/instagramQuery',function(req,res){
  query = req.body.query;
  console.log(query);
  client.hgetall(req.sessionID, function (err, obj){
    if (err){
      var problem = {status: "Fail", err:err};
      res.send(err);
      res.end();
    }
    else{
        console.log(obj);
		console.log(obj);
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'twtaccesstokenkey':obj.instagram_AT,
            'twtaccesstokensecret':obj.instagram_TS,
        }
      
        fetch('http://localhost:8080/graphql', {method:'POST',
          headers: headers,
          body: JSON.stringify({"query":query })
          }).then(function(response){
            return response.text();
        }).then(function(responseBody){
            var send = {status: 'OK', answer: responseBody};
            res.send(send);
        });  
    }
  });
});

module.exports = router;
