const express = require('express');
const router = express.Router();
const userController = require('../app/controller/userController')

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get("/:id", userController.getDetailUser);
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router;