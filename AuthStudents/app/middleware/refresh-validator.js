const { check, cookie, validationResult } = require('express-validator');


validatorParams = [
    check('scode').isAscii(),
    cookie('token').isAscii()
];


let validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}


module.exports = {
    validatorParams,
    validator
}