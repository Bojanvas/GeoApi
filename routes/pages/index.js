const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Main', page: 'inc/_main'});
});

/* GET countries page */
router.get('/countries', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Countries', page: 'inc/_countries'});
});

/* GET ranking page */
router.get('/results', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Results', page: 'inc/_results'});
});

/* GET documentation page */
router.get('/documentation', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Documentation', page: 'inc/_documentation'});
});

module.exports = router;
