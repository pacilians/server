const express = require("express");
const router = express.Router();

const baseRouter = require("./base");
const userRouter = require("./user");

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
router.get("/error", (req, res) => {
  throw new Error("BROKEN");
  res.send("OK");
});

router.use("/", baseRouter);
router.use("/user", userRouter);

module.exports = router;
