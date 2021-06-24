const knex = require('knex');
const config = require('../config/postgres');
const DB_PG = knex(config);


module.exports = DB_PG;
