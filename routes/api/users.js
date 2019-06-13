var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var auth = require('../../middlewares/auth');
const repository = require('../../repositories/repository');
var router = express.Router();
const passportConf = require('../../config/passport');


router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'], session: false }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
  //Check for old token. If have send it to verification, if not create new token
  const token = req.headers['jwt'];
  if(token){
    res.redirect('/users/auth');
  }else{
    createJWT(req, res);
  }
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

/* Verify provided token */
router.get('/auth', auth.verifyToken, (req, res, next) => {
  res.status(200).json({
    message: 'Signin successful'
  });
});

function createJWT(req, res){
  jwt.sign({ id: req.user.id, name: req.user.name, email: req.user.email}, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if(err) return console.log(err);
    res.status(200).json({
      message: 'Signin successful',
      token: token
    });
  });
}

router.get('/', (req, res, next) => {
  repository.getAllUsers((err, users) => {
    if(err) console.log(err);
    res.status(200).json(users);
  });
});

router.put('/', (req, res, next) => {
  repository.setUserCountry(req.country, (err, user) => {
    if(err) console.log(err);
    res.status(200).json(user);
  });
});

module.exports = router;
