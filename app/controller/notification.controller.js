const { plainToClass } = require("class-transformer");
const { Notification } = require("../../core/model");
const JsonResponse = require("../../core/response");
const { notificationService } = require("../service");

const NotificationController = {
  async getAllNotifications(req, res) {
    const notifications = await notificationService.getAllNotifications();
    const response = new JsonResponse(
      200,
      { notifications: notifications },
      "Successfully fetched notifications"
    );
    response.send(res);
  },

  async getNotificationById(req, res) {
    const id = req.params.id;
    const notification = await notificationService.getNotificationById(id);
    const response = new JsonResponse(
      200,
      { notification: notification },
      "Successfully fetched notification by ID"
    );
    response.send(res);
  },

  async createNotification(req, res) {
    const notification = plainToClass(Notification, req.body);
    const createdNotification = await notificationService.createNotification(
      notification
    );
    const response = new JsonResponse(
      200,
      { notification: createdNotification },
      "Successfully created notification"
    );
    response.send(res);
  },

  async markNotificationAsRead(req, res) {
    const id = req.params.id;
    const user = req.user
    await notificationService.markNotificationAsRead(id, user.name);
    const response = new JsonResponse(200, {},   "Notification marked as read");
    response.send(res);
  },

  async deleteNotification(req, res) {
    const id = req.params.id;
    await notificationService.deleteNotification(id);
    const response = new JsonResponse(200, {}, "Notification deleted");
    response.send(res);
  },

  async checkRoutine(req, res) {
    await notificationService.checkRoutine();
    const response = new JsonResponse(200, {}, "");
    response.send(res);
  },
};

module.exports = NotificationController;
