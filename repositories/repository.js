const Country = require('../models/country');
const User = require('../models/user');
const Result = require('../models/result');
const cloudinary = require('cloudinary').v2;
const cloudinaryConf = require('../config/cloudinary');
const countryUtils = require('../utils/countryUtils');

const repository = {

  /*
  * Edit country of the user
  * @arg1 ID of the user
  * @arg2 Name of the country
  * @arg3 callback
  */
  setUserCountry(userId, newCountry, callback){
    User.findOneAndUpdate( {id:userId}, {$set:{country:newCountry}}, (err, user) => {
      callback(err, user);
    });
  },

  /*
  * Get all countries from db
  * arg1: complete callback
  */
  getAllCountries(completeCallback){
    Country.find({}, (err, countries) => {
      completeCallback(err, countries);
    });
  },

  /*
  * Save country in db
  * @arg1: name of the country 
  * @arg2: name of the capital city
  * @arg3: country points
  * @arg4: path of the flag image
  * @arg5: path of the country image
  * @arg6: complete callback
  */
  saveCountry(name, capital, points, flagImgPath, countryImgPath, completeCallback) {
    cloudinary.uploader.upload(flagImgPath, {width: 300, height: 200, crop: "fill"}, (err, resultFlagImg) => {
      if(err) return console.log(err);
      cloudinary.uploader.upload(countryImgPath, {width: 300, height: 200, crop: "fill"}, (err, resultCountryImg) => {
        if(err) return console.log(err);
        
        const country = new Country({
          name: name,
          capital: capital,
          points: points,
          flag_file_name: resultFlagImg.public_id,
          flag_file_path: resultFlagImg.secure_url,
          country_file_name: resultCountryImg.public_id,
          country_file_path: resultCountryImg.secure_url
        });

        country.save((err, country) => {
          if(err){
            deleteImg(country.flag_file_name);
            deleteImg(country.country_file_name);
          }
          completeCallback(err, country);
        });
      });
    });
  },

  /*
  * Delete country by id from db
  * @arg1: id of the country
  * @arg2: complete callback
  */
  deleteCountry(id, completeCallback){
    Country.findOne({ _id: id}, (err, country) => {
        if(err) return console.log(err);
        deleteImg(country.flag_file_name);
        deleteImg(country.country_file_name);
      }).then(() => {
        Country.deleteOne({_id: id}, (err) => {
            completeCallback(err);
        });
    });
  },

  /*
  * Get all users from db
  * @arg1: completeCallback
  */
  getAllUsers(completeCallback){
    User.find({}, (err, users) => {
      completeCallback(err, users);
    });
  },

  /*
  * Get all results from db
  * @arg1: completeCallback
  */
  getAllResults(completeCallback){
    Result.find({}, (err, results) => {
      completeCallback(err, results);
    });
  },

  /*
  * Get results from db for user by id
  * @arg1: id of the user
  * @arg2: completeCallback
  */
  getResultsByUserId(userId, completeCallback){
    Result.find({ userId: userId}, (err, results) => {
      completeCallback(err, results);
    });
  },

  /*
  * Get results from db for selected country
  */
  getResultsByCountry(country, completeCallback){
    User.find({ country: country}, (err, users) => {
      if(err) console.log(err);
      
      completeCallback(err, users); //tmp
    });
  },

  /*
  * Save result in db
  * @arg1: id of the user
  * @arg2: points of the user
  * @arg3: completeCallback
  */
  saveResult(userId, points, completeCallback){
    const result = new Result({
      userId: userId,
      points: points
    });

  result.save((err, result) => {
    completeCallback(err, result);
    });
  },

  deleteResult(id, completeCallback){
    Result.deleteOne({_id: id}, (err) => {
      completeCallback(err);
    });
  },

  getUniqueQuestions(completeCallback){
    Country.find({}, (err, countries) => {
      if(err) return console.log(err);
      var randomCountries = countryUtils.getRandom(countries, 5);
      completeCallback(err, randomCountries);
    }).lean();
  }
}

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

module.exports = repository;