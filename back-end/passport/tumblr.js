var express = require('express');
var passport = require('passport');
var Strategy = require('passport-tumblr').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();
var fetch = require('node-fetch');

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    consumerKey: config.tumblr.consumer_key,
    consumerSecret: config.tumblr.consumer_secret,
    callbackURL: 'http://localhost:3000/login/tumblr/return'
  },
  function(token, tokenSecret, profile, cb) {
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    return cb(null,profile);
  }));

router.get('/login/tumblr', passport.authorize('tumblr'));
router.get('/login/tumblr/return', passport.authorize('tumblr', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'tumblr_token', req.account.token, redis.print);
    client.hset(req.sessionID, 'tumblr_tokenSecret', req.account.tokenSecret, redis.print);
    res.send('<script>window.close()</script>');
  }
);

router.post('/tumblrQuery',function(req,res){
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
            'tumblrtoken':obj.tumblr_token,
			'tumblrtokensecret':obj.tumblr_tokenSecret
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

router.post('/tumblrIngest',function(req,res){
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
            'tumblrtoken':obj.tumblr_token,
			'tumblrtokensecret':obj.tumblr_tokenSecret
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
