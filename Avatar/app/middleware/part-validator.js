const { check, validationResult } = require('express-validator');

validatorParams = [
    check('part').isIn(['eyes', 'mouth', 'cloth', 'front-hair', 'back-hair', 'head']),
    check('id').isNumeric().isLength({ min: 2, max: 2}),
];
     
function validator(req, res, next) {
    console.log("2222222222222222222222222");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errorrrrrrrrr");
        
        return res.status(422).json({ errors: errors.array() });
    }
    
    
    next();
}


module.exports = {
    validatorParams,
    validator
}


