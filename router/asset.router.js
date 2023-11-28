const express = require('express');
const router = express.Router();
const assetController = require('../app/controller/asset.controller');
const { wrap } = require("../core/error/error-handler");

router.post('/', wrap(assetController.createAsset));
router.get('/:year',wrap(assetController.getAnnualAUC))
router.get('/:month/:year', wrap(assetController.getAssetOnPeriod));

module.exports = router;
