const express = require("express");
const router = express.Router();

const baseRouter = require("./base");
const userRouter = require("./user");
const masterDataRouter = require("./master-data")
const announcementRouter = require("./announcement")
const databaseRouter = require("./database")
const auditRouter = require("./audit")
const securityAccount = require("./security-account")

router.use("/", baseRouter);
router.use("/user", userRouter);
router.use("/master-data", masterDataRouter)
router.use("/announcement", announcementRouter)
router.use("/database",databaseRouter)
router.use("/audit",auditRouter)
router.use("/security-account",securityAccount)

module.exports = router;
