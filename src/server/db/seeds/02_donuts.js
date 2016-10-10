
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donuts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('donuts').insert({name: 'Maple Bacon Bar', topping: 'Maple and Bacon goodness', price: 3}),
        knex('donuts').insert({name: 'Voodoo Doll', topping: 'Pecans, Chocolate, hatred', price: 4}),
        knex('donuts').insert({name: 'Munchkins', topping: 'Powdered Sugar', price: 1}),
        knex('donuts').insert({name: 'Classic Glazed', topping: 'Your basic glazed donut', price: 2}),
        knex('donuts').insert({name: 'Apple Fritter', topping: 'Apple, sugar, love', price: 3}),
        knex('donuts').insert({name: 'Vanilla Long John', topping: 'Vanilla frosting', price: 2}),
        knex('donuts').insert({name: 'Chocolate Long John', topping: 'Chocolate frosting', price: 2})
      ]);
    });
};
