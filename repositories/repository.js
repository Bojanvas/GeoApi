const Country = require('../models/country');
const Admin = require('../models/admin');
const User = require('../models/user');
const Result = require('../models/result');
const cloudinary = require('cloudinary').v2;
const cloudinaryConf = require('../config/cloudinary');
const countryUtils = require('../utils/countryUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

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
  * arg1: callback
  */
  getAllCountries(callback){
    Country.find({}, (err, countries) => {
      callback(err, countries);
    });
  },

  /*
  * Save country in db
  * @arg1: name of the country 
  * @arg2: name of the capital city
  * @arg3: country points
  * @arg4: path of the flag image
  * @arg5: path of the country image
  * @arg6: callback
  */
  saveCountry(name, capital, points, flagImgPath, countryImgPath, callback) {
    cloudinary.uploader.upload(flagImgPath, {width: 300, height: 200, crop: "fill"}, (err, resultFlagImg) => {
      if(err) return callback(err, undefined);
      cloudinary.uploader.upload(countryImgPath, {width: 300, height: 200, crop: "fill"}, (err, resultCountryImg) => {
        if(err) return callback(err, undefined);
        
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
            callback(err, undefined);
          }
          callback(undefined, country);
        });
      });
    });
  },

  /*
  * Delete country by id from db
  * @arg1: id of the country
  * @arg2: callback
  */
  deleteCountry(id, callback){
    Country.findOne({ _id: id}, (err, country) => {
        if(err) return console.log(err);
        deleteImg(country.flag_file_name);
        deleteImg(country.country_file_name);
      }).then(() => {
        Country.deleteOne({_id: id}, (err) => {
          if(err) return callback(err, undefined);
          callback(err);
        });
    });
  },

  /*
  * Get all users from db
  * @arg1: callback
  */
  getAllUsers(callback){
    User.find({}, (err, users) => {
      if(err) return callback(err, undefined);
      callback(undefined, users);
    });
  },

  /*
  *
  *
  * */
  getUser(email, callback){
    User.find({ email: email}, (err, user) => {
      if(err) return callback(err, undefined);
      callback(undefined, user);
    });
  },

  /*
  * Get all results from db
  * @arg1: callback
  */
  getAllResults(callback){
    Result.find({}).populate('user').exec((err, results) => {
      if(err) return callback(err, undefined);
      callback(undefined, results);
    });
  },

  /*
  * Get results from db for user by id
  * @arg1: id of the user
  * @arg2: callback
  */
  getResultsByUserId(userId, callback){
    Result.find({ userId: userId}, (err, results) => {
      if(err) return callback(err, undefined);
      callback(undefined, results);
    });
  },

  /*
  * Get results from db for selected country
  */
  getResultsByCountry(country, callback){
    User.find({ country: country}, (err, users) => {
      if(err) return callback(err, undefined);
      callback(undefined, users); //tmp
    });
  },

  /*
  * Save result in db
  * @arg1: id of the user
  * @arg2: points of the user
  * @arg3: callback
  */
  saveResult(userId, points, time, callback){
    User.findById(userId, (err, user) => {
      if(err) callback(err, undefined);
      const result = new Result({
        user: user,
        points: points
      });
  
    result.save((err, result) => {
      if(err) return callback(err, undefined);
      callback(undefined, result);
      });
    });
  },

  deleteResult(id, callback){
    Result.deleteOne({_id: id}, (err) => {
      callback(err);
    });
  },

  getUniqueQuestions(callback){
    Country.find({}, (err, countries) => {
      if(err) return callback(err, undefined);
      var randomCountries = countryUtils.getRandom(countries, 5);
      callback(undefined, randomCountries);
    }).lean();
  },

  createAdmin(email, password, callback){
    Admin.findOne({email: email}, (err, admin) => {
      if(err) return callback(err, undefined);
      if(admin != null) {
        return callback(err, undefined);
      }else{
        bcrypt.hash(password, 10, (err, hash) => {
          if(err) return callback(err, undefined);
  
          const admin = new Admin({
            email: email,
            password: hash,
          });
      
          admin.save((err, admin) => {
            if(err) return callback(err, undefined);
            callback(undefined, admin);
          });
        });
      }
    });
  },

  loginAdmin(req, callback){
    Admin.findOne({ email: req.body.email }, (err, admin) => {
      if (err) {
          callback(err, undefined);
      }
      if (admin == null) return callback('Admin not found', undefined);
      bcrypt.compare(req.body.password, admin.password, (err, isMatch) => {
          if(err) callback(err, undefined);
          if(isMatch){
              //accure pass
              createJWT(admin, (err, token) => {
                if(err) return callback(err, undefined);
                callback(undefined, token);
              });
          }else{
              //wrong pass
              callback('Wrong password', undefined);
          }
      });
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

//JWT for admin
function createJWT(admin, callback){
  jwt.sign({ id: admin.id, email: admin.email}, process.env.JWT_KEY_ADMIN, { expiresIn: '7d' }, (err, token) => {
    if(err) return console.log(err);
    callback(err, token);
  });
}

module.exports = repository;