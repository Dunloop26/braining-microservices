const express = require('express');
const pointsGoalController = require('../controllers/points-goal-controller');
const authToken = require('../middleware/auth-token');

//const yieldsValidator = require('../middleware/register-validator');
const router = express.Router();


router.get('/points-goal', authToken.njwtAuth, pointsGoalController.pointsGoal);


module.exports = router;
