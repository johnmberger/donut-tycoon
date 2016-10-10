
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('employees').insert({
          first_name: 'John',
          last_name: 'Berger',
          email: 'johnberger@yo.com',
          favorite_donut: 3,
          shop_id: 1
        }),
        knex('employees').insert({
          first_name: 'Tommy',
          last_name: 'Gas',
          email: 'tgas@yahoo.com',
          favorite_donut: 1,
          shop_id: 2
        }),
        knex('employees').insert({
          first_name: 'Austin',
          last_name: 'Man',
          email: 'aman@gmail.com',
          favorite_donut: 5,
          shop_id: 3
        }),
        knex('employees').insert({
          first_name: 'Alex',
          last_name: 'Glass',
          email: 'Glass@rocket.com',
          favorite_donut: 2,
          shop_id: 4
        }),
        knex('employees').insert({
          first_name: 'Justin',
          last_name: 'True',
          email: 'Justin@crack.org',
          favorite_donut: 7,
          shop_id: 4
        }),
        knex('employees').insert({
          first_name: 'Sam',
          last_name: 'Ho',
          email: 'ho@donuts.co',
          favorite_donut: 6,
          shop_id: 5
        }),
      ]);
    });
};
