const express = require('express');
const router = express.Router();
const { getAll, getOne, getOneShop } = require('../queries/queries');
const { newDonut, editDonut } = require('../queries/posts');

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

router.get('/:id/edit', function (req, res, next) {
  const donutID = parseInt(req.params.id);
  getOne('donuts', donutID)
  .then(donut => res.render('donuts/edit', {donut: donut[0]}));
});

router.post('/new', function (req, res, next) {
  newDonut(req.body)
  .then(result => {
    getAll('donuts')
    .then(donuts => res.render('donuts/donuts', {donuts, message: `${result[0].name} has been added!`}));
  });
});

router.post('/:id/edit', function (req, res, next) {
  editDonut(req.body)
  .then(result => {
    getAll('donuts')
    .then(donuts => res.render('donuts/donuts', {donuts, message: `${result[0].name} has been updated!`}));
  });
});

module.exports = router;
