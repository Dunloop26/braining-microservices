const express = require('express');
//const authToken = require('../middleware/auth-token');
const questionController = require('../controllers/questions-controller');

const router = express.Router();


router.get('/questions',  questionController.questions);


module.exports = router;