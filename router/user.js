const express = require('express');
const router = express.Router();
const userController = require('../app/controller/user.controller')

const authJwt = require('../core/middleware/authjwt');
const { wrap } = require("../core/error/error-handler")

router.use(authJwt);
router.post('/', wrap(userController.createUser))
router.get('/', wrap(userController.getAllUser))
router.get("/:id", wrap(userController.getDetailUser))
router.put("/:id", wrap(userController.updateUser))
router.delete("/:id", wrap(userController.deleteUser));

module.exports = router;