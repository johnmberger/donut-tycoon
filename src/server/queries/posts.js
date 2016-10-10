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

function editDonut(data) {
  return knex('donuts')
  .where('id', data.id)
  .update({
    name: data.name,
    topping: data.topping,
    price: data.price
  })
  .returning('*');
}

module.exports = { newDonut, editDonut };
