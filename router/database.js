const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer()
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
router.post("/file/:customerId", upload.single("file"), databaseController.createCustomerFile)
router.put("/file/:fileId", upload.single("file"), databaseController.updateCustomerFile)
router.delete("/file/:fileId", databaseController.deleteCustomerFile)
router.get("/file/:fileId", databaseController.getDetailFile)

module.exports = router;