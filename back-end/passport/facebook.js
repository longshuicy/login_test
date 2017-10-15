var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.facebook.client_id,
    clientSecret: config.facebook.client_secret,
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.refreshToken = refreshToken;
    profile.accessToken = accessToken;
    return cb(null,profile);
  }));

router.get('/login/facebook', passport.authorize('facebook'));
router.get('/login/facebook/return', passport.authorize('facebook', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'facebook', req.account.accessToken, redis.print);
    res.send('<script>window.close()</script>');
  }
);

router.post('/facebookQuery',function(req,res){
  query = req.body.query;
  client.hgetall(req.sessionID, function (err, obj){
    if (err){
      var problem = {status: "Fail", err:err};
      res.send(err);
      res.end();
    }
    else{
        console.log(obj);
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'fbaccesstoken':obj.facebook
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
