exports.up = function(knex) {
    return knex.schema.hasColumn('users', 'role')
      .then((exists) => {
        if (!exists) {
          return knex.schema.table('users', function (table) {
            table.string('role');
          });
        }
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('role');
    });
  };
  