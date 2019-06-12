const Country = require('../models/country');
const Result = require('../models/result');
const cloudinary = require('cloudinary').v2;

const repository = {

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
       console.log(id);
    Result.deleteOne({_id: id}, (err) => {
      completeCallback(err);
    });
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