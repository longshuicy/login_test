var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var router = express.Router();
var config = require('../config.js');
var fetch = require('node-fetch');
var redis = require('redis');
var fs = require('fs');
var client = redis.createClient();

function writeTextFile(filepath, output) {
  var txtFile = new File(filepath);
  txtFile.open("w"); //
  txtFile.writeln(output);
  txtFile.close();
}


client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    consumerKey: config.twitter.consumer_key,
    consumerSecret: config.twitter.consumer_secret,
    oob: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(accessToken, tokenSecret, profile, cb) {
    profile.tokenSecret = tokenSecret;
    profile.accessToken = accessToken;
    return cb(null,profile);
  }));

router.get('/login/twitter', passport.authorize('twitter'));
router.get('/login/twitter/return', passport.authorize('twitter', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'twitter_AT', req.account.accessToken, redis.print);
    client.hset(req.sessionID, 'twitter_TS', req.account.tokenSecret, redis.print);
    res.send('<script>window.close()</script>');
  }
);


router.post('/twitterQuery',function(req,res){
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
            'twtaccesstokenkey':obj.twitter_AT,
            'twtaccesstokensecret':obj.twitter_TS,
        }
    
        fetch('http://localhost:8080/graphql', {method:'POST',
          headers: headers,
          body: JSON.stringify({"query":query })
          }).then(function(response){
            return response.text();
        
		}).then(function(responseBody){
			// push to the frontend
			var send = {status: 'OK', answer: responseBody};
			res.send(send);
			
        }).catch(function(err){
			console.log(err);
			var send ={status:'Fail',err:err}
			res.send(send);
		});  
    }
  });
});

router.post('/twitterIngest',function(req,res){	
	
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
				'twtaccesstokenkey':obj.twitter_AT,
				'twtaccesstokensecret':obj.twitter_TS,
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
				console.log("here");
				fetch('http://localhost:1111/verification',
					{
						method:'POST',
						headers: {'Accept': 'application/json', 'Content-Type':'application/json'},
						body: JSON.stringify({	
								'username': req.user.username,
								'password': req.user.password,
								'sessionID':req.sessionID,
								'data': responseBody,
								'platform':req.body.platform
							})
					}
				).then(function(response){
					//var send = {status: 'OK', 'url' : response.text()};
					//res.send(send);
					return response.text();
				
				}).then(function(responseBody) {
					console.log(responseBody);
					var send = {status: 'OK', 'url' : responseBody};
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
