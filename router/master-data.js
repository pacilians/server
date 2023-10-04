const express = require('express');
const router = express.Router();
const masterDataController = require('../app/controller/master-data.controller')

const authJwt = require('../core/middleware/authjwt');

// router.use(authJwt);

router.get('/', masterDataController.getAllData)

router.post('/business', masterDataController.createBusiness);
router.get('/business', masterDataController.getAllBusiness);
router.delete("/business/:id", masterDataController.deleteBusiness);

router.post('/service', masterDataController.createService);
router.get('/service', masterDataController.getAllService);
router.delete("/service/:id", masterDataController.deleteService);

router.post('/mandatory', masterDataController.createMandatory);
router.get('/mandatory', masterDataController.getAllMandatory);
router.delete("/mandatory/:id", masterDataController.deleteMandatory);

module.exports = router;