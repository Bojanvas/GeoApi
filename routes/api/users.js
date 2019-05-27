var express = require('express');
var passport = require('passport');
var router = express.Router();
const User = require('../../models/user');
const passportConf = require('../../config/passport');


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'], session: false }));


router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
  res.redirect('/dashboard');
});


router.get('/auth/facebook', passport.authenticate('facebook'));


router.get('/auth/facebook/callback', passport.authenticate('facebook', { 
  successRedirect: '/', failureRedirect: '/login' }));


module.exports = router;
