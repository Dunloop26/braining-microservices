const redis = require('redis');
const config = require('../config/redis');


let DB_REDIS = redis.createClient(config.redis);
DB_REDIS.select(0);
DB_REDIS.on('error', (err) => console.log("Error " + err));


module.exports = DB_REDIS;
