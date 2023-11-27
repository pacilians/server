const express = require('express');
const router = express.Router();
const notificationController = require('../app/controller/notification.controller');

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.get("/routine", notificationController.checkRoutine)
router.get('/:id', notificationController.getNotificationById);
router.put('/:id/mark-read', notificationController.markNotificationAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
