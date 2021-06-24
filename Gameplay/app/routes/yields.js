const express = require('express');
const yieldsController = require('../controllers/yields-controller');
const authToken = require('../middleware/auth-token');
//const yieldsValidator = require('../middleware/register-validator');
const router = express.Router();


router.get('/yields', authToken.njwtAuth, yieldsController.yields);


module.exports = router;
