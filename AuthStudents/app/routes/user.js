const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();
const authToken = require('../middleware/auth-token');


router.get('/name', authToken.njwtAuth, userController.name);


module.exports = router; 