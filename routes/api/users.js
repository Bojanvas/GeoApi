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
    res.redirect('http://192.168.1.103:19006/?token=' + token);
    // res.redirect('/users/auth');
  }else{
    createJWT(req, (err, token) => {
      if(err) return console.log(err);
       res.redirect('http://192.168.1.103:19006/?token=' + token);
      // res.status(200).json({
      //   message: 'Updated token successful',
      //   token: token
      // });
    });
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

/* Get user by mail */
router.get('/:email', auth.verifyToken, (req, res, next) => {
  repository.getUser(req.params.email, (err, user) => {
    if(err) return console.log(err);
    res.status(200).json(user);
  });
});

//JWT for user
function createJWT(req, callback){
  jwt.sign({ id: req.user.id, name: req.user.name, email: req.user.email}, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if(err) return console.log(err);
    callback(err, token);
  });
}

router.get('/', (req, res, next) => {
  repository.getAllUsers((err, users) => {
    if(err) console.log(err);
    res.status(200).json(users);
  });
});

router.put('/', (req, res, next) => {
  repository.editUser(req.body, (err, user) => {
    if(err) console.log(err);
    res.status(200).json(user);
  });
});

module.exports = router;
