const express = require('express');
const router = express.Router();
const securitiesAccountController = require('../app/controller/security-account.controller');

const authJwt = require('../core/middleware/authjwt');
const { wrap } = require('../core/error/error-handler');

// router.use(authJwt);
router.post('/', wrap(securitiesAccountController.createSecuritiesAccount));
router.get('/', wrap(securitiesAccountController.getAllSecuritiesAccounts));
router.get('/:id', wrap(securitiesAccountController.getSecuritiesAccountById));
router.put('/:id', wrap(securitiesAccountController.updateSecuritiesAccount));
router.delete('/:id', wrap(securitiesAccountController.deleteSecuritiesAccount));

module.exports = router;
