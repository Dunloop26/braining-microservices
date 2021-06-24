const redis = require('redis');
const config = require('../config/redis');

let DB_REDIS_0 = redis.createClient(config.redis);
DB_REDIS_0 .select(0);
DB_REDIS_0 .on('error', (err) => console.log("Error " + err));


module.exports = DB_REDIS_0;

