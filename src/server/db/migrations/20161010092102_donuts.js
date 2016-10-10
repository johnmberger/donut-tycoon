exports.up = (knex, Promise) => {
  return knex.schema.createTable('donuts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('topping');
    table.integer('price');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('donuts');
};
