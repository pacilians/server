const express = require('express');
const router = express.Router();
const masterDataController = require('../app/controller/master-data.controller')

const authJwt = require('../core/middleware/authjwt');
const { wrap } = require("../core/error/error-handler")

// router.use(authJwt);

router.get('/', wrap(masterDataController.getAllData))

router.post('/business', wrap(masterDataController.createBusiness));
router.get('/business', wrap(masterDataController.getAllBusiness));
router.delete("/business/:id", wrap(masterDataController.deleteBusiness));

router.post('/service', wrap(masterDataController.createService))
router.get('/service', wrap(masterDataController.getAllService))
router.delete("/service/:id", wrap(masterDataController.deleteService))

router.post('/mandatory', wrap(masterDataController.createMandatory))
router.get('/mandatory', wrap(masterDataController.getAllMandatory))
router.delete("/mandatory/:id", wrap(masterDataController.deleteMandatory))

module.exports = router;