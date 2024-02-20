exports.up = function(knex) {
    return knex.schema.createTable('pets', function(table) {
      table.increments('petID').primary();
      table.string('pet_name').notNullable();
      table.float('age', 8, 2);
      table.string('type').notNullable();
      table.string('adoption_status').notNullable();
      table.float('height', 8, 2);
      table.float('weight', 8, 2);
      table.string('text').notNullable();
      table.string('image_path');
      table.integer('userID')
        .unsigned()
        .notNullable()
        .references('userID')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamp('CreatedDate').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pets');
  };
  