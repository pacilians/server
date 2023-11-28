const { Notification } = require("../../core/model");
const { notificationRepository } = require("../repository");
const databaseService = require("./database.service");
const moment = require("moment");

const NotificationService = {
  async getAllNotifications() {
    const notifications = await notificationRepository.getAllNotifications();

    const updatedNotifications = notifications.map((notification) => {
      const created = moment(notification.created_at).format("YYYY-MM-DD");
      return {
        ...notification,
        created_at: created,
      };
    });
    return updatedNotifications;
  },

  async getNotificationById(id) {
    return await notificationRepository.getNotificationById(id);
  },

  async createNotification(notification) {
    const createdNotification = await notificationRepository.createNotification(
      notification
    );
    return createdNotification;
  },

  async markNotificationAsRead(id, name) {
    await notificationRepository.updateNotificationReadStatus(id, name);
  },

  async deleteNotification(id) {
    await notificationRepository.deleteNotification(id);
  },
  async checkRoutine() {
    const customers = await databaseService.getAllCustomers();
    customers.forEach(async (cst) => {
      const birth_key_person = cst.key_person_dob;
      const birth_company = cst.birth_date;
      const bod = cst.board_of_director;
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      const oneDayInMs = 1 * 24 * 60 * 60 * 1000;

      let send = {
        id_customer: cst.id,
        type: "",
        id_person: "",
        name_person: "",
        message: "",
      };

      const now = new Date();

      const diffKeyPerson = Math.abs(birth_key_person - now);
      let sendKeyPerson = 0;
      if (diffKeyPerson === 0) {
        send = {
          ...send,
          type: "key_person",
          id_person: "",
          name_person: cst.key_person_name,
          message: `${cst.key_person_name} Key Person from ${cst.name} is having birthday today`,
        };
        sendKeyPerson = 1;
      } else if (diffKeyPerson <= oneDayInMs) {
        send = {
          ...send,
          type: "key_person",
          id_person: "",
          name_person: cst.key_person_name,
          message: `${cst.key_person_name} Key Person from ${cst.name} is having birthday 1 day ahead`,
        };
        sendKeyPerson = 1;
      } else if (diffKeyPerson <= sevenDaysInMs) {
        send = {
          ...send,
          type: "key_person",
          id_person: "",
          name_person: cst.key_person_name,
          message: `${cst.key_person_name} Key Person from ${cst.name} is having birthday 7 days ahead`,
        };
        sendKeyPerson = 1;
      } else if (diffKeyPerson <= thirtyDaysInMs) {
        send = {
          ...send,
          type: "key_person",
          id_person: "",
          name_person: cst.key_person_name,
          message: `${cst.key_person_name} Key Person from ${cst.name} is having birthday 30 days ahead`,
        };
        sendKeyPerson = 1;
      }

      if (sendKeyPerson) {
        await this.createNotification(send);
      }

      // Check Company
      const diffKeyCompany = Math.abs(birth_company - now);
      let sendKeyCompany = 0;
      if (diffKeyPerson === 0) {
        send = {
          ...send,
          type: "company",
          id_person: "",
          name_person: cst.name,
          message: `${cst.name} is having anniversary today`,
        };
        sendKeyCompany = 1;
      } else if (diffKeyCompany <= oneDayInMs) {
        send = {
          ...send,
          type: "company",
          id_person: "",
          name_person: cst.name,
          message: `${cst.name} is having anniversary 1 day ahead`,
        };
        sendKeyCompany = 1;
      } else if (diffKeyCompany <= sevenDaysInMs) {
        send = {
          ...send,
          type: "company",
          id_person: "",
          name_person: cst.name,
          message: `${cst.name} is having anniversary 7 days ahead`,
        };
        sendKeyCompany = 1;
      } else if (diffKeyCompany <= thirtyDaysInMs) {
        send = {
          ...send,
          type: "company",
          id_person: "",
          name_person: cst.name,
          message: `${cst.name} is having anniversary 30 days ahead`,
        };
        sendKeyCompany = 1;
      }

      if (sendKeyCompany) {
        await this.createNotification(send);
      }

      // Check BOD
      bod.forEach(async (ctx) => {
        // Check Company
        const bod_birthday = ctx.birth_date
        const diffKeyCompany = Math.abs(bod_birthday - now);
        let sendStatus = 0;
        if (diffKeyCompany === 0) {
          send = {
            ...send,
            type: "bod",
            id_person: ctx.id,
            name_person: ctx.name,
            message: `${cst.key_person_name} BOD ${cst.name} is having birthday today`,
          };
          sendStatus = 1;
        } else if (diffKeyCompany <= oneDayInMs) {
          send = {
            ...send,
            type: "bod",
            id_person: ctx.id,
            name_person: ctx.name,
            message: `${cst.key_person_name} BOD ${cst.name} is having birthday today`,
          };
          sendStatus = 1;
        } else if (diffKeyCompany <= sevenDaysInMs) {
          send = {
            ...send,
            type: "bod",
            id_person: ctx.id,
            name_person: ctx.name,
            message: `${cst.key_person_name} BOD ${cst.name} is having birthday today`,
          };
          sendStatus = 1;
        } else if (diffKeyCompany <= thirtyDaysInMs) {
          send = {
            ...send,
            type: "bod",
            id_person: ctx.id,
            name_person: ctx.name,
            message: `${cst.key_person_name} BOD ${cst.name} is having birthday today`,
          };
          sendStatus = 1;
        }

        if (sendStatus) {
          await this.createNotification(send);
        }
      });
    });
  },
};

module.exports = NotificationService;
