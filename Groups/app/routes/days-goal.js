const express = require('express');
const authToken = require('../middleware/auth-token');
const daysGoalController = require('../controllers/days-goal-controller');

const router = express.Router();


router.get('/days-goal', authToken.njwtAuth, daysGoalController.daysGoal);


module.exports = router;
