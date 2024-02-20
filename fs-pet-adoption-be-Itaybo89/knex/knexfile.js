const path = require('path');
const pathToMigrations = path.resolve(__dirname, '../migrations');
require('dotenv').config();

const user = process.env.USER;
console.log(user);

module.exports = {
    client: 'mysql',
    connection: {
        database: process.env.DATABASE_TYPE, 
        user: process.env.USER, 
        password: process.env.SQL_PASS, 
        host: process.env.HOST, 
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: pathToMigrations
    }
};
