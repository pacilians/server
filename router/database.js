const express = require('express');
const router = express.Router();
const databaseController = require('../app/controller/database.controller')

const authJwt = require('../core/middleware/authjwt');

router.use(authJwt);
router.post('/', databaseController.createCustomer);
router.get('/', databaseController.getAllCustomers);
router.get("/:id", databaseController.getDetailCustomer);
router.put("/:id", databaseController.updateCustomer)
router.put("/bod/:id", databaseController.updateBoardOfDirector)
router.delete("/bod/:id", databaseController.deleteBoardOfDirector)
router.put("/rekening/:id", databaseController.updateBankAccount)
router.delete("/rekening/:id", databaseController.deleteBankAccount)
router.delete("/:id", databaseController.deleteCustomer)

module.exports = router;