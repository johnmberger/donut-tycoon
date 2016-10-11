const express = require('express');
const router = express.Router();
const { getAll, getOneShopData } = require('../queries/queries');
const { newShop, deleteShop } = require('../queries/posts');

router.get('/', function (req, res, next) {
  getAll('shops')
  .then((shops) => res.render('shops/shops', {shops}));
});

router.get('/new', function (req, res, next) {
  getAll('donuts')
  .then(donuts => res.render('shops/new', {donuts}));
});

router.get('/:id', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  getOneShopData(shopID)
  .then((shop) => res.render('shops/shop', {shop}));
});

router.get('/:id/edit', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  Promise.all([getOneShopData(shopID), getAll('donuts')])
  .then(results => {
    res.render('shops/edit', {shop: results[0], donuts: results[1]});
  });
});

router.post('/new', function (req, res, next) {
  newShop(req.body)
  .then(result => {
    getAll('shops')
    .then(shops => res.render('shops/shops', {shops, message: `${result.name} has been added.`}));
  });
});

router.post('/:id/delete', function (req, res, next) {
  deleteShop(parseInt(req.params.id))
  .then(result => {
    getAll('shops')
    .then(shops => res.render('shops/shops', {shops, message: `${result[0].name} has been deleted.`}));
  });
});

module.exports = router;
