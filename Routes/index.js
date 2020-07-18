var passportFacebook = require('../auth/facebook');
var passportGitHub = require('../auth/github');
var passportGoogle = require('../auth/google');
var passportLinkedIn = require('../auth/linkedin');
var passportTwitter = require('../auth/twitter');
var homeCtrl = require('../Controllers/home');
var accountCtrl = require('../Controllers/account');
module.exports = function(app){
    
    app.get('/', homeCtrl.home);
    app.get('/auth/facebook',passportFacebook.authenticate('facebook'));
    app.get('/auth/facebook/callback',  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {res.redirect('/users');});
    app.get('/auth/github', passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));
    app.get('/auth/github/callback', passportGitHub.authenticate('github', { failureRedirect: '/login' }), function(req, res) {res.redirect('/users');});
    app.get('/auth/google', passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    app.get('/auth/google/callback', passportGoogle.authenticate('google', { failureRedirect: '/login' }), function(req, res) { res.redirect('/users');});
    app.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));
    app.get('/auth/linkedin/callback', passportLinkedIn.authenticate('linkedin', {failureRedirect: '/login'}));
    app.get('/auth/twitter', passportTwitter.authenticate('twitter'));
    app.get('/auth/twitter/callback', passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/users');
    });
};

