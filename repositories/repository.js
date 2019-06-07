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
            if(err) return console.log(err);
            completeCallback(countries);
        });
    },

    /*
    * Save country in db
    * @arg1: name of the country 
    * @arg2: country points
    * @arg3: name of the flag img file
    * @arg4: path of the flag img file 
    * @arg5: name of the country img file 
    * @arg6: path of the country img file
    * @arg7: complete callback
    */
    saveCountry(name, capital, points, flag_file_name, flag_file_path, country_file_name, country_file_path, completeCallback) {
        const country = new Country({
            name: name,
            capital: capital,
            points: points,
            flag_file_name: flag_file_name,
            flag_file_path: flag_file_path,
            country_file_name: country_file_name,
            country_file_path: country_file_path
          });

          country.save((err, country) => {
            if (err) return console.error(err);
            completeCallback(country);
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
              if(err) return console.log(err);
              completeCallback();
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