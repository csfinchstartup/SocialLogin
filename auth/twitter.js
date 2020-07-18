var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id.doc._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: "FIAz26u2jtRkVcsdvAFBZ3UQU",
    consumerSecret: "fQjus6rVsh02zsRLVcChEkp8kJ8F3L4kkXpmosD3SQq0D9p9RE",
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) {
        console.log(err); 
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;
