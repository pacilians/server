const express = require("express");
const router = express.Router();

const baseRouter = require("./base");
const userRouter = require("./user");
const masterDataRouter = require("./master-data")
const announcementRouter = require("./announcement")
const databaseRouter = require("./database")

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

router.use("/", baseRouter);
router.use("/user", userRouter);
router.use("/master-data", masterDataRouter)
router.use("/announcement", announcementRouter)
router.use("/database",databaseRouter)

module.exports = router;
