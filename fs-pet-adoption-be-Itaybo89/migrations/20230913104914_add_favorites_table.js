exports.up = function(knex) {
    return knex.schema.createTable('favorites', function(table) {
      table.increments('favoriteID').primary();
      table.integer('petID')
        .unsigned()
        .notNullable()
        .references('petID')
        .inTable('pets')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('userID')
        .unsigned()
        .notNullable()
        .references('userID')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamp('createdDate').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('favorites');
  };
  