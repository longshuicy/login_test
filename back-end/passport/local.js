var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('../db.js');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.retrieveUserByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }

      bcrypt.compare(password, user.password, function(err, res) {
          if (err) return cb(err);
          if (res === false) {
            return cb(null, false);
          } else {
            return cb(null, user);
          }
      });

    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  //console.log(user)
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  console.log("deserialize called!")
  db.retrieveUserId(username, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      var problem = {error:'No such username and password combination'};
      return res.send(problem);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      var problem = {status: 'OK', username: user.username};
      return res.send(problem);
    });
  })(req, res, next);
});


router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.end();
});

/*
 * POST /register
 * Purpose: To persist a user's account to save their data
 * Process:
 *    1) Verify post payload has a username and password property
 *      - if not, return with an error
 *    2) Verify that the password is at least 8 characters but not more than 75
 *      - if not, return with an error
 *    3) Verify that the username isn't taken
 *      - if not, return with an error
 *    4) If all the above conditions hold, save the user into the database with a salted password 
 *       and redirect the user agent to the home screen
 */
router.post('/register',function(req,res,next){
  //console.log(req.body);
	
  if (!req.body.username || !req.body.password) {
    var problem = {error:'You need a username and a password to register.'};
     res.send(problem); 
     return;
  }
   
  if (req.body.password.length < 8 || req.body.password.length > 75) {
    var problem = {error:'Sorry, you password must be between 8 and 75 characters.'};
     res.send(problem); 
     return;
  }
 
  db.retrieveUserByUsername(req.body.username, function(err, user){
    if(user) {
     var problem = {error:'Sorry! That username is already in use.'};
     res.send(problem); 
     return;
    }
     
    if(err) {
      return next(err);
    }
       
    bcrypt.genSalt(10, function(err, salt){
      if (err) {
        return next(err);
      }
     
      bcrypt.hash(req.body.password, salt, function(err, hash){
        if (err) {
          return next(err);
        }
       
        var newUser = {username: req.body.username, password: hash};
        //console.log(hash);
        db.storeUser(newUser, function(err, result){
          if (err) {
            return next(err);
          }
          var problem = {status:'OK'};
          res.send(problem);           
          return;
        });

      });
    });

  });
  return;
  // var name = {error: 'fuck', foo: 'bar'};
  // res.send(name);
});

module.exports = router;
