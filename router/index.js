const express = require("express");
const router = express.Router();

const baseRouter = require("./base.router");
const userRouter = require("./user.router");
const masterDataRouter = require("./master-data.router")
const announcementRouter = require("./announcement.router")
const databaseRouter = require("./database.router")
const auditRouter = require("./audit.router")
const securityAccount = require("./security-account.router")
const notification = require("./notification.router")

router.use("/", baseRouter);
router.use("/user", userRouter);
router.use("/master-data", masterDataRouter)
router.use("/announcement", announcementRouter)
router.use("/database",databaseRouter)
router.use("/audit",auditRouter)
router.use("/security-account",securityAccount)
router.use("/notification", notification)

module.exports = router;
