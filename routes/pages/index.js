const express = require('express');
const router = express.Router();
const fileUtils = require('../../utils/fileUtils');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Main', page: 'inc/_main'});
});

/* GET countries page */
router.get('/countries', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Countries', page: 'inc/_countries'});
});

/* GET users page */
router.get('/users', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Users', page: 'inc/_users'});
});

/* GET ranking page */
router.get('/results', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Results', page: 'inc/_results'});
});

/* GET documentation page */
router.get('/documentation', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard | Documentation', page: 'inc/_documentation'});
});

/* GET server log page */
router.get('/log', (req, res, next) => {
  fileUtils.processLineByLine('logs/app.log', (lines) => {
    console.log(lines);
    res.render('dashboard', { title: 'Dashboard | Log', page: 'inc/_log', data: lines});
  });
});

module.exports = router;
