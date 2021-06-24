const express = require('express');
const experienceController = require('../controllers/experience-controller');
const authToken = require('../middleware/auth-token');
//const yieldsValidator = require('../middleware/register-validator');
const router = express.Router();


router.get('/experience', authToken.njwtAuth, experienceController.experience);


module.exports = router;
