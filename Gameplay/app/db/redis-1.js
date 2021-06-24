const redis = require('redis');
const config = require('../config/redis');



let DB_REDIS_1 = redis.createClient(config.redis);
DB_REDIS_1 .select(1);
DB_REDIS_1 .on('error', (err) => console.log("Error " + err));


module.exports = DB_REDIS_1;
