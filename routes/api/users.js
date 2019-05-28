var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../../models/user');
const passportConf = require('../../config/passport');


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'], session: false }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
  jwt.sign({ id: req.user.id, name: req.user.name, email: req.user.email}, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if(err) return console.log(err);
    console.log("JWT", token);
    res.status(200).json({
      message: 'Signin successful',
      token: token
    });
  });
  res.redirect('/dashboard');
});


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));


module.exports = router;
