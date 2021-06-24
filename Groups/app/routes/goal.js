const express = require('express');
const authToken = require('../middleware/auth-token');
const goalController = require('../controllers/goal-controller');

const router = express.Router();


router.get('/goal', authToken.njwtAuth, goalController.goal);


module.exports = router;