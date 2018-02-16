var express = require('express');
var passport = require('passport');
var Strategy = require('passport-spotify').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();
var fetch = require('node-fetch');

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.spotify.client_id,
    clientSecret: config.spotify.client_secret,
    callbackURL: 'http://localhost:3000/login/spotify/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.refreshToken = refreshToken;
    profile.accessToken = accessToken;
    return cb(null,profile);
  }));

router.get('/login/spotify', passport.authorize('spotify'));
router.get('/login/spotify/return', passport.authorize('spotify', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'spotify', req.account.accessToken, redis.print);
	//client.hset(req.sessionID, 'spotify_TS', req.account.tokenSecret, redis.print);
	console.log(req.account.accessToken);
    res.send('<script>window.close()</script>');
  }
);

router.post('/spotifyQuery',function(req,res){
  query = req.body.query;
  //console.log(query);
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
            'spotifyaccesstoken':obj.spotify
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

router.post('/spotifyIngest',function(req,res){
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
            'spotifyaccesstoken':obj.spotify
        }
    
        fetch('http://localhost:8080/graphql', 
			{method:'POST',
			  headers: headers,
			  body: JSON.stringify({"query":query })
			
			}
		).then(function(response){
            return response.text();
        
		}).then(function(responseBody){
			
			// post it to zhouheng's database
			fetch('Here is zhaoheng your endpoint to accept this json object',
				{
					method:'POST',
					headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
					body: {
							'username': req.user.username,
							'password': req.user.password,
							'sessionID':req.sessionID,
							'data':JSON.stringify(responseBody),
							'platform':req.body.platform
						}
				}
			).then(function(response){
				return response.text();
				var send = {status: 'OK'};
				res.send(send);
			
			}).catch(function(err){
				console.log(err);
				var send ={status:'Fail',err:err}
				res.send(send);
				
			}); 
			
        });  
    }
  });
});

module.exports = router;
