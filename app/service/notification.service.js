const { Notification } = require("../../core/model");
const { notificationRepository } = require("../repository");
const databaseService = require("./database.service")

const NotificationService = {
  async getAllNotifications() {
    return await notificationRepository.getAllNotifications();
  },

  async getNotificationById(id) {
    return await notificationRepository.getNotificationById(id);
  },

  async createNotification(notification) {
    const createdNotification = await notificationRepository.createNotification(notification);
    return createdNotification;
  },

  async markNotificationAsRead(id,name) {
    await notificationRepository.updateNotificationReadStatus(id, name);
  },

  async deleteNotification(id) {
    await notificationRepository.deleteNotification(id);
  },
  async checkRoutine(){
    const customers = await databaseService.getAllCustomers()
    customers.forEach((cst)=>{
      console.log(cst);
      console.log(cst.board_of_director)
    })
  }
};

module.exports = NotificationService;
