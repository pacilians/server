const { announcementRepository } = require("../repository");
const userService = require("./user.service");

const AnnouncementService = {
  async createAnnouncement(announcement) {
    return await announcementRepository.createAnnouncement(announcement);
  },
  async getAllAnnouncements() {
    let all = await announcementRepository.getAllAnnouncements();
    for (let i = 0; i < all.length; i++) {
      const announcement = all[i];
      const user = await userService.getUserById(announcement.id_user);
      all[i].user = user.name;
    }
    return all;
  },
  async getAnnouncementById(id) {
    let announcement = await announcementRepository.getAnnouncementById(id);

    if (!announcement) return null;

    const user = await userService.getUserById(announcement.id_user);
    announcement.user = user.name;
    return announcement;
  },
  async updateAnnouncement(announcement) {
    return await announcementRepository.updateAnnouncement(announcement);
  },
  async deleteAnnouncement(id) {
    return await announcementRepository.deleteAnnouncement(id);
  },
  async pinAnnouncement(id) {
    const announcement = await this.getAnnouncementById(id);
    let pin = 1;
    if (announcement.is_pinned === 1) pin = 0;
    return await announcementRepository.pinAnnouncement(id, pin)
  },
};

module.exports = AnnouncementService;






