var express = require('express');
var passport = require('passport');
var Strategy = require('passport-pinterest').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();
var fetch = require('node-fetch');

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
	clientID: config.pinterest.client_id,
    clientSecret: config.pinterest.client_secret,
	scope: ['read_public', 'read_relationships'],
    callbackURL: 'http://localhost:3000/login/pinterest/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
	console.log(accessToken);
	console.log(refreshToken);
    return cb(null,profile);
  }));

router.get('/login/pinterest', passport.authorize('pinterest'));
router.get('/login/pinterest/return', passport.authorize('pinterest', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'pinterest_accessToken', req.account.accessToken, redis.print);
    client.hset(req.sessionID, 'pinterest_refreshToken', req.account.refreshToken, redis.print);
    res.send('<script>window.close()</script>');
  }
);

router.post('/pinterestQuery',function(req,res){
  query = req.body.query;
  client.hgetall(req.sessionID, function (err, obj){
    if (err){
      var problem = {status: "Fail", err:err};
      res.send(err);
      res.end();
    }
    else{
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            //'tumblrtoken':obj.tumblr_token,
			//'tumblrtokensecret':obj.tumblr_tokenSecret
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
