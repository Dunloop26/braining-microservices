const express = require('express');
const poinstBuyController = require('../controllers/points-buy-controller');
const authToken = require('../middleware/auth-token');
//const yieldsValidator = require('../middleware/register-validator');
const router = express.Router();


router.get('/points-buy', authToken.njwtAuth, poinstBuyController.pointsBuy);


module.exports = router;
