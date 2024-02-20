exports.up = function(knex) {
    return knex.schema.table('pets', function(table) {
      table.string('color');
      table.string('hypoallergenic');
      table.string('dietary_restrictions');
      table.string('breed');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('pets', function(table) {
      table.dropColumn('color');
      table.dropColumn('hypoallergenic');
      table.dropColumn('dietary_restrictions');
      table.dropColumn('breed');
    });
  };
  