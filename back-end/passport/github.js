var express = require('express');
var passport = require('passport');
var Strategy = require('passport-github2').Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.github.client_id,
    clientSecret: config.github.client_secret,
    callbackURL: 'http://localhost:3000/login/github/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return cb(null, profile);
  }));

router.get('/login/github', passport.authorize('github'));
router.get('/login/github/return', passport.authorize('github', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'github', req.account.accessToken, redis.print);
    res.send('<script>window.close()</script>');
  }
);
module.exports = router;
