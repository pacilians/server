const express = require("express");
const router = express.Router();

const baseRouter = require("./base")
const userRouter = require("./user");

router.use("/", baseRouter)
router.use("/user", userRouter);

module.exports = router;
