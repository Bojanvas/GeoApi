var express = require('express');
const Country = require('../../models/country');
const cloudinary = require('cloudinary').v2
const cloudinaryConf = require('../../config/cloudinary');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/countries/' });
require("dotenv").config();

var router = express.Router();

/* GET all countries. */
router.get('/', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if(err) return console.log(err);
    res.status(200).json(countries);
  });
});

/* POST country */
router.post('/', upload.fields([{ name: 'flag_file', maxCount: 1 }, { name: 'country_file', maxCount: 1 }]), (req, res, next) => {
  cloudinary.uploader.upload(req.files.flag_file[0].path, {width: 300, height: 200, crop: "fill"}, (err, resultFlag) => { 
    if(err) return console.log(err);
    cloudinary.uploader.upload(req.files.country_file[0].path, (err, resultCountryImg) => { 
      if(err) return console.log(err);
      // console.log(resultFlag);
      const country = new Country({
        name: req.body.country_name,
        capital: req.body.capital,
        points: req.body.points,
        flag_file_name: resultFlag.public_id,
        flag_file_path: resultFlag.secure_url,
        country_file_name: resultCountryImg.public_id,
        country_file_path: resultCountryImg.secure_url
      });
    
      country.save((err, country) => {
        if (err) return console.error(err);
        res.status(200).json(country);
      });
    });
  });
});

/* DELETE country by id */
router.delete('/', (req, res, next) => {
  Country.findOne({ _id: req.headers['id']}, (err, country) => {
    if(err) return console.log(err);
    //delete img
    deleteImg(country.flag_file_name);
    deleteImg(country.country_file_name);
  }).then(function(){
    Country.deleteOne({_id: req.headers['id']}, (err) => {
      if(err) return console.log(err);
      res.status(200).json({
        message: "Country Deleted"
      });
    });
  });
});

/*
* @return result.url for http path or result.secure_url for https path
*/
function uploadImg(img){
  cloudinary.uploader.upload(img, (err, result) => { 
    if(err) return console.log(err);
    return result.url
  });
}

/*
* @arg image name without .extension
* @return result
*/
function deleteImg(img){
  cloudinary.uploader.destroy(img.split('.')[0], (err, result) => {
    if(err) return console.log(err);
    return result;
  });
}


/* GET 20 unique questions */
router.get('/ranked', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if(err) return console.log(err);
    var random = getRandom(countries, 5);
    res.status(200).json(random);
  }).lean();

});

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
      result[n].type = getRandomType();

  }
  return result;
}

function getRandomType() {
  const types = ['country', 'city', 'flag'];
  var type = types[Math.floor(Math.random()*types.length)];
  return type;
}

module.exports = router;
