var express = require('express');
const Country = require('../../models/country');
const cloudinary = require('cloudinary').v2
const cloudinaryConf = require('../../config/cloudinary');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/countries/' });
require("dotenv").config();
const parentPath = 'https://res.cloudinary.com/dlc29htkz/image/upload/v1559069595/';

var router = express.Router();

/* GET all countries. */
router.get('/', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if(err) return console.log(err);
    res.status(200).json(countries);
  });
});

/* POST country */
router.post('/', upload.fields([{ name: 'flag', maxCount: 1 }, { name: 'country_img', maxCount: 1 }]), (req, res, next) => {
  var flagImgUrl = uploadImg(req.files.flag[0].path);
  var countryImgUrl = uploadImg(req.files.country_img[0].path);
  // console.log("flagImgUrl", flagImgUrl);
  const country = new Country({
    name: req.body.country_name,
    capital: req.body.capital,
    points: req.body.points,
    flag: flagImgUrl,
    country_img: countryImgUrl
  });

  country.save((err, country) => {
    if (err) return console.error(err);
    res.status(200).json(country);
  });
});

/* DELETE country by id */
router.delete('/', (req, res, next) => {
  Country.deleteOne({_id: req.headers['id']}, (err) => {
    if(err) return console.log(err);
    res.status(200).json({
      message: "Country Deleted"
    });
  });
});

/*
* return result.url for http path
* return result.secure_url for https path
*/
function uploadImg(img){
  cloudinary.uploader.upload(img, (err, result) => { 
    if(err) return  console.log(err);
    return result.url
  });
}

/*
* arg image name without .extension
* return result
*/
function deleteImg(img){
  cloudinary.uploader.destroy(img, (err, result) => {
    if(err) return console.log(err);
    return result;
  });
}

module.exports = router;
