const express = require('express');
const validatorRegisterStudent = require('../middleware/register-student-validator');
const registerStudentController = require('../controllers/register-student-controller');
//const authToken = require('../middleware/auth-token');
const router = express.Router();


router.post('/register-student', validatorRegisterStudent.validatorParams, validatorRegisterStudent.validator, 
            registerStudentController.registerStudent);


module.exports = router;