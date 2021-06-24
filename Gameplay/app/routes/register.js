const express = require('express');
const registerController = require('../controllers/register-controller');
const registerValidator = require('../middleware/register-validator');
const router = express.Router();


router.post('/register', registerValidator.validatorParams,
    registerValidator.validator, registerController.register
    );


module.exports = router;