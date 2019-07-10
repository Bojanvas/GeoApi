var express = require('express');
var router = express.Router();
const repository = require('../../repositories/repository');

// /* GET results */
// router.get('/', (req, res, next) => {
//   repository.getAllResults((err, results) => {
//     if(err) return console.log(err);
//     res.status(200).json(results);
//   });
// });

/* GET results */
router.get('/', (req, res, next) => {
  if(req.query.userid){
    repository.getResultsByUserId(req.query.userid, (err, results) => {
      if (err) return console.log(err);
      res.status(200).json(results);
    });
  }else if(req.query.email){
    repository.getResultsByEmail(req.query.email, (err, results) => {
      if (err) return console.log(err);
      res.status(200).json(results);
    });
  }else{
    repository.getAllResults((err, results) => {
      if(err) return console.log(err);
      res.status(200).json(results);
    });
  }
});

/* GET results by country */
// router.get('/', (req, res, next) => {
//   repository.getResultsByCountry(req.query.country, (err, results) => {
//     if (err) return console.log(err);
//     res.status(200).json(results);
//   });
// });

/* POST result */
router.post('/', (req, res, next) => {
  if(!req.body.points || !req.body.time) return res.status(400).json({error: 'Missing params'});
  if(req.body.email){
    //by email
    repository.saveResultByEmail(req.body.email, req.body.points, req.body.time, (err, result) => {
      if(err) return console.log(err);
      res.status(200).json(result);
    });
  }else if(req.body.userid){
    //by id
    repository.saveResultById(req.body.userid, req.body.points, req.body.time, (err, result) => {
      if(err) return console.log(err);
      res.status(200).json(result);
    });
  }else{
    //as guest
    repository.calculateResultForGuest(req.body.points, req.body.time, (err, result) => {
      if(err) return console.log(err);
      res.status(200).json(result)
    });
  }
});

/* DELETE result */
router.delete('/', (req, res, next) => {
  if(!req.query.resultid) return res.status(400).json({error: 'Missing params'});
  repository.deleteResult(req.query.resultid, (err) => {
    if(err) return console.log(err);
    res.status(200).json({
      message: "Result Deleted"
    });
  });
});

module.exports = router;