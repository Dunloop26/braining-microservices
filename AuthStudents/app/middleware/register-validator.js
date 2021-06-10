const { check, validationResult } = require('express-validator');


validatorParams = [
    check('student').isEmail(),
    check('code_school').isLength({ min: 1, max: 10}),
    check('code_school').isNumeric(),
    check('pass').isLength({ min: 8, max: 15}),
    check('name').isLength({ min: 1, max: 255}),
    check('last_name').isLength({ min: 1, max: 255}),
    check('gender').custom((value) => {
        if (value != 'm'  && value != 'f'){
            throw new Error('Gender error');
        }
        return true;
    }),
    check('type_document').custom((value) => {
        if (value != 'cc'  && value != 'ti'){
            throw new Error('Type document error');
        }
        return true;
    }),
    check('document').isNumeric(),
    check('document').isLength({ min: 1, max: 50}),
    check('birthdate').isISO8601(),
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


