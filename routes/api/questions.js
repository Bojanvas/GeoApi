var express = require('express');
const repository = require('../../repositories/repository');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/countries/' });
var auth = require('../../middlewares/auth');
require("dotenv").config();

var router = express.Router();

/* GET all countries. */
router.get('/', auth.verifyTokenAdmin, (req, res, next) => {
  repository.getAllCountries((err, countries) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(countries);
  });
});

/* POST country */
router.post('/', auth.verifyTokenAdmin, upload.fields([{ name: 'flag_file', maxCount: 1 }, { name: 'country_file', maxCount: 1 }]), (req, res, next) => {
  repository.saveCountry(req.body.country_name, req.body.capital, req.body.points, req.files.flag_file[0].path, req.files.country_file[0].path, (err, country) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(country);
  });
});

/* DELETE country by id */
router.delete('/', auth.verifyTokenAdmin, (req, res, next) => {
  repository.deleteCountry(req.headers['id'], (err) => {
    if(err) return res.status(500).send(err);
    res.status(200).json({
      message: "Country Deleted"
    });
  });
});


/* GET 20 unique questions */
router.get('/ranked', (req, res, next) => {
  repository.getUniqueQuestions((err, questions) => {
    if(err) return res.status(500).send(err);
    res.status(200).json(questions);
  });
  // Country.find({}, (err, countries) => {
  //   if(err) return console.log(err);
  //   var random = countryUtils.getRandom(countries, 5);
  //   res.status(200).json(random);
  // }).lean();

});

module.exports = router;
