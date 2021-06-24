const express = require('express');
const validatorPart = require('../middleware/part-validator');
const avatarController = require('../controllers/avatar-controller');

const authToken = require('../middleware/auth-token');
const authTokenResources = require('../middleware/auth-token-resources');

const router = express.Router();

router.get('/avatar', authToken.njwtAuth, avatarController.getAvatarCombination);
router.get('/avatar/user/:part/:id', validatorPart.validatorParams,
            validatorPart.validator, avatarController.getAvatarPart);

module.exports = router;