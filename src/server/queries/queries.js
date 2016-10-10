const knex = require('../db/connection');

function getAll(table) {
  return knex(table);
}

function getOne(table, id) {
  return knex(table).where('id', id);
}

function justOneShop(id) {
  return knex('shops_donuts').where('donut_id', id)
  .join('shops', 'shops.id', 'shops_donuts.shop_id');
}

function getOneShop(id) {
  return knex('shops').where('shops.id', id)
  .then((shop) => {
    shop[0].donuts = [];
    shop[0].employees = [];
    return knex('shops_donuts')
    .where({shop_id: shop[0].id})
    .join('donuts', 'donuts.id', 'shops_donuts.donut_id')
    .then((donuts) => {
      donuts.forEach((donut) => {
        shop[0].donuts.push(donut);
      });
      return knex('employees')
      .where('employees.shop_id', id)
      .then((employees) => {
        employees.forEach((employee) => {
          shop[0].employees.push(employee);
        });
        return shop[0];
      });
    });
  });
}

function getOneEmployee(id) {
  return knex('employees').where('employees.id', id)
  .then((employee) => {
    return knex('donuts')
    .where('donuts.id', employee[0].favorite_donut)
    .then((donut) => {
      employee[0].donut = donut[0];
      return knex('shops')
      .where('shops.id', employee[0].shop_id)
      .then((shop) => {
        employee[0].shop = shop[0];
        return employee[0];
      });
    });
  });
}

module.exports = { getAll, getOne, getOneShop, justOneShop, getOneEmployee };
