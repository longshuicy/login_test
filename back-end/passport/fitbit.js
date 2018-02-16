var express = require('express');
var passport = require('passport');
var Strategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var router = express.Router();
var config = require('../config.js');
var redis = require('redis');
var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

passport.use(new Strategy({
    clientID: config.fitbit.client_id,
    clientSecret: config.fitbit.client_secret,
    callbackURL: 'http://localhost:3000/login/fitbit/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return cb(null, profile);
  }));

router.get('/login/fitbit', passport.authorize('fitbit', {scope: ['activity','heartrate','location','profile']} ));
router.get('/login/fitbit/return', passport.authorize('fitbit', { failureRedirect: '/home' }),
  function(req, res) {
    client.hset(req.sessionID, 'fitbit', req.account.accessToken, redis.print);
    res.send('<script>window.close()</script>');
  }
);
module.exports = router;
