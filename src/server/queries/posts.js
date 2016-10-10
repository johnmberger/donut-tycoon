const knex = require('../db/connection');

function newDonut(data) {
  return knex('donuts')
  .returning('*')
  .insert({
    name: data.name,
    topping: data.topping,
    price: data.price
  });
}

module.exports = { newDonut };
