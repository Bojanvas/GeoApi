var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/auth');
const repository = require('../../repositories/repository');

/* GET results */
router.get('/', auth.verifyToken, (req, res, next) => {
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

/* POST result */
router.post('/', auth.verifyToken, (req, res, next) => {
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
  }
});

/* POST(calculate) results as guest */
router.post('/guest', (req, res, next) => {
    repository.calculateResultForGuest(req.body.points, req.body.time, (err, result) => {
      if(err) return console.log(err);
      res.status(200).json(result)
    });
});

/* DELETE result */
router.delete('/', auth.verifyTokenAdmin, (req, res, next) => {
  if(!req.query.resultid) return res.status(400).json({error: 'Missing params'});
  repository.deleteResult(req.query.resultid, (err) => {
    if(err) return console.log(err);
    res.status(200).json({
      message: "Result Deleted"
    });
  });
});

module.exports = router;