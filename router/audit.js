const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer()
const auditController = require('../app/controller/audit.controller')

const authJwt = require('../core/middleware/authjwt');
const { wrap } = require("../core/error/error-handler")

// router.use(authJwt);

router.get("/", wrap(auditController.getAuditList))
router.post("/",wrap(auditController.createBulkAudit))

router.post('/event', wrap(auditController.createAuditEvent))
router.delete("/event/:id", wrap(auditController.deleteAuditEvent))
router.put("/event/:id",wrap(auditController.updateAuditEvent))

router.post('/item', wrap(auditController.createAudit))
router.put("/item/status/:id", wrap(auditController.updateStatusAudit))
router.put("/item/file/:id", upload.single("file"), wrap(auditController.updateFileAudit))
router.delete("/item/:id", wrap(auditController.deleteAudit))


module.exports = router;