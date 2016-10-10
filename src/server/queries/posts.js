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

function newEmployee(data) {
  return knex('employees')
  .returning('*')
  .insert({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    favorite_donut: parseInt(data.favorite_donut),
    shop_id: parseInt(data.shop_id)
  });
}

function editEmployee(data) {
  return knex('employees')
  .where('id', data.id)
  .update({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    favorite_donut: parseInt(data.favorite_donut),
    shop_id: parseInt(data.shop_id)
  })
  .returning('*');
}

module.exports = { newDonut, editDonut, newEmployee, editEmployee };
