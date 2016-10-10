const express = require('express');
const router = express.Router();
const { getAll, getOne, getOneShop } = require('../queries/queries');

router.get('/', function (req, res, next) {
  getAll('donuts')
  .then(donuts => res.render('donuts/donuts', {donuts}));
});

router.get('/new', function (req, res, next) {
  res.render('donuts/new');
});

router.get('/:id', function (req, res, next) {
  const donutID = parseInt(req.params.id);
  getOne('donuts', donutID)
  .then(donut => res.render('donuts/donut', {donut: donut[0]}));
});

module.exports = router;
