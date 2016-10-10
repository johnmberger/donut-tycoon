exports.up = (knex, Promise) => {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('city');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('shops');
};
