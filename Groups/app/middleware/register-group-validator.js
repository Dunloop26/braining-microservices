const { check, validationResult } = require('express-validator');

validatorParams = [
    //check('student').isEmail(),
    check('idTeacher').isNumeric(),
    check('group').isLength({ min: 1, max: 6}),
    check('grade').isNumeric(),
    check('grade').isLength({ min: 1, max: 3}),
    check('modality').isString(),
    check('goal').isNumeric(),
    check('daysGoal').isString(),
    check('recipientsReport').isString(),
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


