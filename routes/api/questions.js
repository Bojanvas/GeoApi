var express = require('express');
const Country = require('../../models/country');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/countries/' })

var router = express.Router();

/* GET all countries. */
router.get('/', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if(err) return console.log(err);
    res.status(200).json(countries);
  });
});

/* POST country */
router.post('/', upload.fields([{ name: 'flag', maxCount: 1 }, { name: 'country_img', maxCount: 1 }]), function(req, res, next) {
  const country = new Country({
    name: req.body.country_name,
    capital: req.body.capital,
    points: req.body.points,
    flag: req.files.flag[0].path,
    country_img: req.files.country_img[0].path
  });

  country.save((err, country) => {
    if (err) return console.error(err);
    res.status(200).json(country);
  });
});

/* DELETE country by name */
router.delete('/', (req, res, next) => {
  Country.deleteOne({name: req.headers['name']}, (err) => {
    if(err) return console.log(err);
    res.status(200).json({
      message: "Country Deleted"
    });
  });
});

module.exports = router;
