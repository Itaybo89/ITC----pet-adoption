exports.up = function(knex) {
  return knex.schema.hasTable('users')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('users', function(table) {
          table.increments('userID').primary();
          table.string('email').notNullable();
          table.string('password').notNullable();
          table.string('first_name');
          table.string('last_name');
          table.string('phone_number');
          table.string('short_bio');
          table.string('role'); 
          table.timestamp('CreatedDate').defaultTo(knex.fn.now());
        });
      }
    });
};

exports.down = function(knex) {
  return knex.schema.hasTable('users')
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable('users');
      }
    });
};
