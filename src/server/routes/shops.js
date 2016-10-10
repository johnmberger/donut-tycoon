const express = require('express');
const router = express.Router();
const { getAll, getOneShop } = require('../queries/queries');

router.get('/', function (req, res, next) {
  getAll('shops')
  .then((shops) => res.render('shops/shops', {shops}));
});

router.get('/:id', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  getOneShop(shopID)
  .then((shop) => res.render('shops/shop', {shop}));
});

module.exports = router;
