const express = require('express');
const router = express.Router();
const { getAll, getOne, getOneShop } = require('../queries/queries');
const { newDonut } = require('../queries/posts');

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

router.post('/new', function (req, res, next) {
  newDonut(req.body)
  .then((result) => {
    getAll('donuts')
    .then(donuts => res.render('donuts/donuts', {donuts, message: `${result[0].name} has been added!`}));
  });
});

module.exports = router;
