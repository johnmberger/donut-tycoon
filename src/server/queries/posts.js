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

function deleteDonut(id) {
  return knex('shops_donuts')
  .del('*')
  .where('donut_id', id)
  .then(() => {
    return knex('employees')
    .update('favorite_donut', null)
    .where('favorite_donut', id)
    .then(() => {
      return knex('donuts')
      .del('*')
      .where('id', id)
      .returning('*');
    });
  });
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

function deleteEmployee(id) {
  return knex('employees')
  .del('*')
  .where('id', id)
  .returning('*');
}

function newShop(data) {
  return knex('shops')
  .returning('*')
  .insert({
    name: data.name,
    city: data.city
  })
  .then(newShop => {
    if (data.donut_id.length > 1) {
      data.donut_id.forEach((id) => {
        knex('shops_donuts')
        .insert({
          donut_id: parseInt(id),
          shop_id: parseInt(newShop[0].id)
        })
        .then(() => {});
      });
    } else {
      knex('shops_donuts')
      .insert({
        donut_id: parseInt(data.donut_id),
        shop_id: parseInt(newShop[0].id)
      })
      .then(() => {});
    }
    return newShop[0];
  })
  .catch(err => err);
}

function deleteShop(id) {
  return knex('employees')
  .del('*')
  .where('shop_id', id)
  .then(() => {
    return knex('shops_donuts')
    .del('*')
    .where('shop_id', id);
  })
  .then(() => {
    return knex('shops')
    .del('*')
    .where('id', id)
    .returning('*');
  });
}

module.exports = { newDonut, editDonut, deleteDonut, newEmployee, editEmployee, deleteEmployee, newShop, deleteShop };
