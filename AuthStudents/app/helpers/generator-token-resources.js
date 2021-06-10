const signingKey = require('../config/keys');
const branca = require("branca")(signingKey.SIGNING_KEY_RESOURCES);
const crypto = require('crypto');


let generateTokenResources = () => {
    const randString = crypto.randomBytes(3).toString('base64')
    const token = branca.encode(randString);
    return token;
}


module.exports = generateTokenResources;
  
