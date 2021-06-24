const express = require('express');
const validatorUpdate = require('../middleware/update-validator');
const updateController = require('../controllers/update-controller');
const authToken = require('../middleware/auth-token');
const router = express.Router();

router.put('/update', authToken.njwtAuth, validatorUpdate.validatorParams,
validatorUpdate.validator, updateController.updateAvatar);


module.exports = router;