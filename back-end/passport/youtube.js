var express = require('express');
var passport = require('passport');
var Strategy = require('passport-youtube-v3').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();
var fetch = require('node-fetch');

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.youtube.client_id,
    clientSecret: config.youtube.client_secret,
    callbackURL: 'http://localhost:3000/login/youtube/return',
	scope: ['https://www.googleapis.com/auth/youtube.readonly']
  },
  function(accessToken, refreshToken, profile, cb) {
	profile.refreshToken = refreshToken;
    profile.accessToken = accessToken;
    return cb(null,profile);
  }));

router.get('/login/youtube', passport.authorize('youtube'));
router.get('/login/youtube/return', passport.authorize('youtube', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'youtube_accessToken', req.account.accessToken, redis.print);
	client.hset(req.sessionID, 'youtube_refreshToken', req.account.refreshToken, redis.print);
	//console.log(req.account);
    res.send('<script>window.close()</script>');
  }
);

router.post('/youtubeQuery',function(req,res){
  query = req.body.query;
  client.hgetall(req.sessionID, function (err, obj){
    if (err){
      var problem = {status: "Fail", err:err};
      res.send(err);
      res.end();
    }
    else{
        //console.log(obj);
        var headers = {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'youtubeaccesstoken':obj.youtube_accessToken,
			'youtuberefreshtoken':obj.youtube_refreshToken
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
