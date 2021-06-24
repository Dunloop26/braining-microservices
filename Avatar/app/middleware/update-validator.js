const { check, validationResult } = require('express-validator');

validatorParams = [
    check('avatarCombination.eyes').isNumeric().isLength({ min: 2, max: 2}),
    check('avatarCombination.nose').isNumeric().isLength({ min: 2, max: 2}),
    check('avatarCombination.mouth').isNumeric().isLength({ min: 2, max: 2})
];
     
function validator(req, res, next) {
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


