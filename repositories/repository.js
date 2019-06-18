const Country = require('../models/country');
const Admin = require('../models/admin');
const User = require('../models/user');
const Result = require('../models/result');
const cloudinary = require('cloudinary').v2;
const cloudinaryConf = require('../config/cloudinary');
const countryUtils = require('../utils/countryUtils');
const bcrypt = require('bcrypt');

const repository = {

  /*
  * Edit user
  * @arg1 new data
  * @arg2 callback
  */
  editUser(newData, callback){
    User.findByIdAndUpdate(newData._id, {name:newData.name, country:newData.country}, {new: true}, (err, user) => {
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
    Result.find({}).populate('user').exec((err, results) => {
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
    User.findById(userId, (err, user) => {
      if(err) console.log(err);
      const result = new Result({
        user: user,
        points: points
      });
  
    result.save((err, result) => {
      completeCallback(err, result);
      });
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
  },

  createAdmin(email, password, callback){
    Admin.findOne({email: email}, (err, admin) => {
      if(err) return console.log(err);
      if(admin != null) {
        return callback(err, false);
      }else{
        bcrypt.hash(password, 10, (err, hash) => {
          if(err) return console.log(err);
  
          const admin = new Admin({
            email: email,
            password: hash,
          });
      
          admin.save((err, admin) => {
            callback(err, admin);
          });
        });
      }
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