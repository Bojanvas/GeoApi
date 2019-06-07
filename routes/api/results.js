var express = require('express');
var router = express.Router();
const Result = require('./../../models/result');

/* GET results */
router.get('/', (req, res, next) => {
  Result.find({}, (err, results) => {
    if(err) console.log(err);
    if(results != undefined){
      res.status(200).json(results);
    }else{
      res.status(404).json({
        message: "Not Found"
      });
    }
  });
});

/* GET results for user by id */
router.get('/:userId', (req, res, next) => {
  Result.find({ userId: req.params.userId}, (err, results) => {
    if(err) console.log(err);
    if(results != undefined){
      res.status(200).json(results);
    }else{
      res.status(404).json({
        message: "Not Found"
      });
    }
  });
});

/* POST result */
router.post('/', (req, res, next) => {
  const result = new Result({
    userId: req.headers['userId'],
    points: req.headers['points']
  });

  result.save((err, result) => {
    if(err) console.log(err);
    res.status(200).json(result);
  });
});

module.exports = router;
