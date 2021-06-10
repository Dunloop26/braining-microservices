const DB_REDIS = require('../db/redis');


let deleteToken = (token) => {
    DB_REDIS.del(token);
}


module.exports = deleteToken;
