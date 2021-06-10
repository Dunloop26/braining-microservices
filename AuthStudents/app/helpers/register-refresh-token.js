const DB_REDIS = require('../db/redis');
const crypto = require('crypto');
var base64 = require('js-base64').Base64;


let registerToken = (idStudent) => {
    let token = idStudent + crypto.randomBytes(16).toString('base64');
    let scode = base64.encodeURI(crypto.randomBytes(8).toString('base64'));
    DB_REDIS.hmset(token, {id_student: idStudent, scode: scode});
    DB_REDIS.expire(token, 300);
    return { token: token, scode: scode };
}


module.exports = registerToken;

