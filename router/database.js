const express = require('express');
const router = express.Router();
const databaseController = require('../app/controller/database.controller')

const authJwt = require('../core/middleware/authjwt');

router.use(authJwt);
router.post('/', databaseController.createCustomer);
router.get('/', databaseController.getAllCustomers);
router.get("/:id", databaseController.getDetailCustomer);
router.put("/:id", databaseController.updateCustomer)
router.delete("/:id", databaseController.deleteCustomer)

module.exports = router;