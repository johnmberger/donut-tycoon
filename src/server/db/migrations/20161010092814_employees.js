exports.up = (knex, Promise) => {
  return knex.schema.createTable('employees', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.integer('favorite_donut');
    table.foreign('favorite_donut').references('id').inTable('donuts');
    table.integer('shop_id');
    table.foreign('shop_id').references('id').inTable('shops');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('employees');
};
