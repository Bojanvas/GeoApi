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
  repository.getAllCountries((countries) => {
    if (countries !== undefined) {
      res.status(200).json(countries);
    }else{
      res.status(404).json({
        message: "Not Found"
      });
    }
  });
});

/* POST country */
router.post('/', upload.fields([{ name: 'flag_file', maxCount: 1 }, { name: 'country_file', maxCount: 1 }]), (req, res, next) => {
  cloudinary.uploader.upload(req.files.flag_file[0].path, {width: 300, height: 200, crop: "fill"}, (err, resultFlag) => { 
    if(err) return console.log(err);
    cloudinary.uploader.upload(req.files.country_file[0].path, {width: 300, height: 200, crop: "fill"}, (err, resultCountryImg) => { 
      if(err) return console.log(err);

      repository.saveCountry(req.body.country_name, req.body.capital, req.body.points, 
        resultFlag.public_id, resultFlag.secure_url, resultCountryImg.public_id, resultCountryImg.secure_url, (country) => {
          res.status(200).json(country);
      });
    });
  });
});

/* DELETE country by id */
router.delete('/', (req, res, next) => {
  repository.deleteCountry(req.headers['id'], () => {
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
