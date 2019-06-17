var express = require('express');
var router = express.Router();
const repository = require('../../repositories/repository');

/* GET results */
router.get('/', (req, res, next) => {
  repository.getAllResults((err, results) => {
    if(err) console.log(err);
    res.status(200).json(results);
  });
});

/* GET results by user by id */
router.get('/userId', (req, res, next) => {
  repository.getResultsByUserId(req.query.userId, (err, results) => {
    if (err) console.log(err);
    res.status(200).json(results);
  });
});

/* GET results by country */
router.get('/country', (req, res, next) => {
  repository.getResultsByCountry(req.query.country, (err, results) => {
    if (err) console.log(err);
    res.status(200).json(results);
  });
});

/* POST result */
router.post('/', (req, res, next) => {
  repository.saveResult(req.headers['userid'], req.headers['points'], (err, result) => {
    if(err) console.log(err);
    res.status(200).json(result);
  });
});

/* DELETE result */
router.delete('/', (req, res, next) => {
  repository.deleteResult(req.headers['id'], (err) => {
    if(err) console.log(err);
    res.status(200).json({
      message: "Result Deleted"
    });
  });
});

module.exports = router;
