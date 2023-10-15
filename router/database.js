const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer()
const databaseController = require('../app/controller/database.controller')
const { wrap } = require("../core/error/error-handler")

const authJwt = require('../core/middleware/authjwt');

router.use(authJwt);
router.post('/', wrap(databaseController.createCustomer));
router.get('/', wrap(databaseController.getAllCustomers));
router.get("/:id", wrap(databaseController.getDetailCustomer));
router.put("/:id", wrap(databaseController.updateCustomer))
router.put("/bod/:id", wrap(databaseController.updateBoardOfDirector))
router.delete("/bod/:id", wrap(databaseController.deleteBoardOfDirector))
router.put("/rekening/:id", wrap(databaseController.updateBankAccount))
router.delete("/rekening/:id", wrap(databaseController.deleteBankAccount))
router.delete("/:id", wrap(databaseController.deleteCustomer))
router.post("/file/:customerId", upload.single("file"), wrap(databaseController.createCustomerFile))
router.put("/file/:fileId", upload.single("file"), wrap(databaseController.updateCustomerFile))
router.delete("/file/:fileId", wrap(databaseController.deleteCustomerFile))
router.get("/file/:fileId", wrap(databaseController.getDetailFile))

module.exports = router;