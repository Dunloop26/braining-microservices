const express = require('express');
const validatorRegister = require('../middleware/register-validator');
const registerController = require('../controllers/register-controller');
//const authToken = require('../middleware/auth-token');
const router = express.Router();

router.post('/register', validatorRegister.validatorParams, validatorRegister.validator, registerController.register);


module.exports = router;