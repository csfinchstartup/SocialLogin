var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/User');

passport.use(new LinkedInStrategy({
    consumerKey: "77t3b6t3e1jp58",
    consumerSecret: "IApKj68PLshY0JYe",
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({linkedinId: profile.id}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;