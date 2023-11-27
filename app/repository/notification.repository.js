const db = require("../../core/database");

const NotificationRepository = {
  getAllNotifications: async () => {
    const [rows] = await db.query("SELECT * FROM notification");
    return rows;
  },

  getNotificationById: async (id) => {
    const [rows] = await db.query("SELECT * FROM notification WHERE id = ?", [id]);
    return rows[0];
  },

  createNotification: async (notification) => {
    const { id_customer, type, id_person, name_person, message } = notification;
    const now = new Date();
    const [result] = await db.query(
      "INSERT INTO notification (id_customer, type, id_person, name_person, created_at, message) VALUES (?, ?, ?, ?, ?, ?)",
      [id_customer, type, id_person, name_person, now, message]
    );
    notification.id = result.insertId;
    return notification;
  },

  updateNotificationReadStatus: async (id) => {
    await db.query("UPDATE notification SET is_read = 1 WHERE id = ?", [id]);
  },

  deleteNotification: async (id) => {
    await db.query("DELETE FROM notification WHERE id = ?", [id]);
  },
};

module.exports = NotificationRepository;
