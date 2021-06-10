const express = require('express');
const refreshController = require('../controllers/refresh-controller');
const validatorRefresh = require('../middleware/refresh-validator');
const router = express.Router();


router.post('/', validatorRefresh.validatorParams, validatorRefresh.validator, refreshController.refreshToken);


module.exports = router;