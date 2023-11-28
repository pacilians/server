const express = require('express');
const router = express.Router();
const notificationController = require('../app/controller/notification.controller');
const authJwt = require('../core/middleware/authjwt');
const { wrap } = require("../core/error/error-handler");

router.get("/routine", wrap(notificationController.checkRoutine))
router.use(authJwt);
router.post('/', wrap(notificationController.createNotification));
router.get('/', wrap(notificationController.getAllNotifications));
router.get('/:id', wrap(notificationController.getNotificationById));
router.put('/:id/mark-read', wrap(notificationController.markNotificationAsRead));
router.delete('/:id', wrap(notificationController.deleteNotification));

module.exports = router;
