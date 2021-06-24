const express = require('express');
const validatorRegisterGroup = require('../middleware/register-group-validator');
const registerGroupController = require('../controllers/register-group-controller');
//const authToken = require('../middleware/auth-token');
const router = express.Router();


router.post('/register-group', validatorRegisterGroup.validatorParams, validatorRegisterGroup.validator, registerGroupController.registerGroup);


module.exports = router;