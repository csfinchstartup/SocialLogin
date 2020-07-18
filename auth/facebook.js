var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
    clientID: "113101076757471",
    clientSecret: "e181be46562716d0cad0e38d92ff1125",
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({userid: profile.id}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;
