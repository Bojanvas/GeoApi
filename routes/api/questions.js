var express = require('express');
const Country = require('../../models/country');
const cloudinary = require('cloudinary').v2;
const cloudinaryConf = require('../../config/cloudinary');
const repository = require('../../repositories/repository');
const countryUtils = require('../../utils/countryUtils');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/countries/' });
require("dotenv").config();

var router = express.Router();

/* GET all countries. */
router.get('/', (req, res, next) => {
  repository.getAllCountries((err, countries) => {
    if (err) console.log(err);
    res.status(200).json(countries);
  });
});

/* POST country */
router.post('/', upload.fields([{ name: 'flag_file', maxCount: 1 }, { name: 'country_file', maxCount: 1 }]), (req, res, next) => {
  repository.saveCountry(req.body.country_name, req.body.capital, req.body.points, req.files.flag_file[0].path, req.files.country_file[0].path, (err, country) => {
      if (err) return console.error(err);
      res.status(200).json(country);
  });
});

/* DELETE country by id */
router.delete('/', (req, res, next) => {
  repository.deleteCountry(req.headers['id'], (err) => {
    if(err) return console.log(err);
    res.status(200).json({
      message: "Country Deleted"
    });
  });
});


/* GET 20 unique questions */
router.get('/ranked', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if(err) return console.log(err);
    var random = countryUtils.getRandom(countries, 5);
    res.status(200).json(random);
  }).lean();

});

module.exports = router;
