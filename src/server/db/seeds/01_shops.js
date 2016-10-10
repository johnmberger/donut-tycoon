
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shops').insert({name: 'Revolution Donuts', city: 'Atlanta'}),
        knex('shops').insert({name: 'Krispy Kreme', city: 'Atlanta'}),
        knex('shops').insert({name: 'Dunkin Donuts', city: 'Boston'}),
        knex('shops').insert({name: 'Voodoo Donuts', city: 'Denver'}),
        knex('shops').insert({name: 'Strange Donuts', city: 'St. Louis'})
      ]);
    });
};
