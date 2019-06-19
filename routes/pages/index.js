const express = require('express');
const passport = require('passport');
const auth = require('../../middlewares/auth');
const repository = require('../../repositories/repository');
const passportConf = require('../../config/passport');
const fileUtils = require('../../utils/fileUtils');
const Admin = require('../../models/admin');
const bcrypt = require('bcrypt');
const router = express.Router();
require("dotenv").config();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Main', page: 'inc/_main'});
});

/* GET countries page */
router.get('/countries', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Countries', page: 'inc/_countries'});
});

/* GET users page */
router.get('/users', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Users', page: 'inc/_users'});
});

/* GET ranking page */
router.get('/results', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Results', page: 'inc/_results'});
});

/* GET documentation page */
router.get('/documentation', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Documentation', page: 'inc/_documentation'});
});

/* GET server log page */
router.get('/log', (req, res, next) => {
  fileUtils.processLineByLine('logs/app.log', (lines) => {
    console.log(lines);
    res.render('dashboard', { title: 'Dashboard | Log', page: 'inc/_log', data: lines});
  });
});

router.get('/login', (req, res, next) => {
  res.render('dashboard',  { title: 'Dashboard | Log', page: 'inc/_login'});
})

//Login
router.post('/login', (req, res, next) => {
  console.log(req.body.email);
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if (err) {
        console.log(err);
        return res.status(500);
    }
    if (admin == null) return res.status(403);
    bcrypt.compare(req.body.password, admin.password, (err, isMatch) => {
        if(err) return console.log(err);
        if(isMatch){
            //accure pass
            createJWT(req, (err, token) => {
              if(err) return console.log(err);
              res.status(200).json({
                message: 'Updated token successful',
                token: token
              });
            });
        }else{
            //wrong pass
            res.redirect('/dashboard/login');
        }
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

//JWT for admin
function createJWT(req, callback){
  jwt.sign({ id: req.user.id, email: req.user.email}, process.env.JWT_KEY_ADMIN, { expiresIn: '7d' }, (err, token) => {
    if(err) return console.log(err);
    callback(err, token);
  });
}

module.exports = router;
