const jwt = require("jsonwebtoken");

const UserService = require("../app/service/user.service");
const SECRET_KEY = "BNI CUSTODY SYSTEM";
const JsonResponse = require("../core/response");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Server Is Healty");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.getUserByEmail(email);
  if (user === undefined) {
    return res.status(401).json({ message: "User not found" });
  }

  const passwordIsValid = password === user.password;
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    SECRET_KEY,
    {
      expiresIn: 86400, // expires in 24 hours
    }
  );

  const response = new JsonResponse(200, { token: token, user: user }, "Login Successful");
  response.send(res);
});

router.get("/seed", (req,res) => {
  
  return res.send("Seeding The Database")
})

router.get("/reset", (req, res) => {
  return res.send("Resetting The Database")
})

module.exports = router;
