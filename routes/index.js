var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportGitHub = require('../auth/github');
var passportGoogle = require('../auth/google');
var passportLinkedIn = require('../auth/linkedin');
var passportTwitter = require('../auth/twitter');
var homeCtrl = require('../Controllers/home');
var accountCtrl = require('../Controllers/account');

    
router.get('/', homeCtrl.home);
router.get('/auth/facebook',passportFacebook.authenticate('facebook'));
router.get('/auth/facebook/callback',  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) { res.redirect('/users');});
router.get('/auth/github', passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/auth/github/callback', passportGitHub.authenticate('github', { failureRedirect: '/login' }), function(req, res) { res.redirect('/users');});
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', passportGoogle.authenticate('google', { failureRedirect: '/login' }), function(req, res) { res.redirect('/users');});
router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));
router.get('/auth/linkedin/callback', passportLinkedIn.authenticate('linkedin', {failureRedirect: '/login'}));
router.get('/auth/twitter', passportTwitter.authenticate('twitter'));
router.get('/auth/twitter/callback', passportTwitter.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) { res.redirect('/users');});


module.exports = router;