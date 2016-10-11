const express = require('express');
const router = express.Router();
const { getAll, getOneShopData } = require('../queries/queries');
const { newShop, editShop, deleteShop } = require('../queries/posts');

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
  console.log('edit 1');
  Promise.all([getOneShopData(shopID), getAll('donuts')])
  .then(results => {
    var availableDonuts = results[0].donuts;
    var allDonuts = results[1];
    var selections = {
      available: availableDonuts,
      remaining: allDonuts
    };
    console.log('before for loops');
    for (var i = allDonuts.length - 1; i >= 0; i--) {
      for (var j = availableDonuts.length - 1; j >= 0; j--) {
        if (availableDonuts[j].id === allDonuts[i].id) {
          selections.remaining.splice(i, 1);
        }
      }
    }
    console.log('after the loops');
    res.render('shops/edit', {shop: results[0], donuts: results[1], selections});
  });
});

router.post('/new', function (req, res, next) {
  newShop(req.body)
  .then(result => {
    getAll('shops')
    .then(shops => res.render('shops/shops', {shops, message: `${result.name} has been added.`}));
  });
});

router.post('/:id/edit', function (req, res, next) {
  editShop(req.body)
  .then(result => {
    getAll('shops')
    .then(shops => res.render('shops/shops', {shops, message: `Shop has been updated.`}));
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
