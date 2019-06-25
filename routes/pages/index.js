const express = require('express');
const passport = require('passport');
const auth = require('../../middlewares/auth');
const repository = require('../../repositories/repository');
const passportConf = require('../../config/passport');
const fileUtils = require('../../utils/fileUtils');
const multer  = require('multer');
const upload = multer();
const router = express.Router();
require("dotenv").config();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Main', page: 'inc/_main'});
});

/* GET countries page */
router.get('/countries', auth.verifyTokenAdmin, (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Countries', page: 'inc/_countries'});
});

/* GET users page */
router.get('/users', auth.verifyTokenAdmin, (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Users', page: 'inc/_users'});
});

/* GET ranking page */
router.get('/results', auth.verifyTokenAdmin, (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Results', page: 'inc/_results'});
});

/* GET documentation page */
router.get('/documentation', auth.verifyTokenAdmin, (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Documentation', page: 'inc/_documentation'});
});

/* GET server log page */
router.get('/log', auth.verifyTokenAdmin, (req, res, next) => {
  fileUtils.processLineByLine('logs/app.log', (lines) => {
    console.log(lines);
    res.render('dashboard', { title: 'Dashboard | Log', page: 'inc/_log', data: lines});
  });
});

router.get('/login', (req, res, next) => {
  res.render('dashboard',  { title: 'Dashboard | Log', page: 'inc/_login'});
})

//Login
router.post('/login', upload.none(), (req, res, next) => {
  repository.loginAdmin(req, (err, token) => {
    if(err === 'Wrong password' || err === 'Admin not found'){
      console.log(err);
      return res.status(403).end();
    }else if(err){
      return console.log(err);
    }
    res.status(200).json({
      message: 'Updated token successful',
      token: token
    });
  });
});

//Register DEV ONLY
// router.post('/register', (req, res, next) => {
//   repository.createAdmin(req.body.email, req.body.password, (err, admin) => {
//       if(err) return console.log(err);
//       if(!admin) return res.status(409).json({ message: 'Mail exists' });
//       res.status(200).json(admin);
//   });
// });

module.exports = router;
