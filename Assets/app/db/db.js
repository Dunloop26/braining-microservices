const knex = require('knex');
const config = require('../config/config-db');
const DB_PG = knex(config);


module.exports = DB_PG;