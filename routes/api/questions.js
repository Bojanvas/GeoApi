var express = require('express');
const Country = require('../../models/country');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/', upload.fields([{ name: 'flag', maxCount: 1 }, { name: 'country_img', maxCount: 1 }]), function(req, res, next) {
  console.log(req.files);
  // Country.create({
  //   name: req.body.name,
  //   capital: req.body.capital,
  //   points:req.body.points,
  //   flag: '/path',
  //   country_img: '/path'
  // }).then(country => {
  //   res.status(200).json(country);
  // }).catch(err => console.log(err));


});

module.exports = router;
