const { check, validationResult } = require('express-validator');

validatorParams = [
    
    check('data').isIn(['data1', 'data2', 'data3'])
];
     
function validator(req, res, next) {
    console.log(req.body)
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


