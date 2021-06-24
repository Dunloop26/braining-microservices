const { check, validationResult } = require('express-validator');

validatorParams = [
    //check('student').isEmail(),
    check('idStudent').isNumeric(),
    check('group').isLength({ min: 1, max: 6}),
    check('idTeacher').isNumeric(),
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


