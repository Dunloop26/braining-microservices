const signingKey = require('../config/keys');
const branca = require("branca")(signingKey.SIGNING_KEY_RESOURCES);


let authTokenResources = (req, res, next) => {
    console.log(req.query.tokenResources);
    
    if(!req.query.tokenResources){
        return res.status(403).send({ auth: false, message: 'No token resources provided' });
    }
    try {
        branca.decode(req.query.tokenResources, 3600);
        next();
    } catch (err) {
        return res.status(500).send({ auth: false, message: err });
    }
}


module.exports = {
    authTokenResources
}