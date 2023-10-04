const { announcementRepository } = require("../repository");

const AnnouncementService = {
  async createAnnouncement(announcement) {
    return await announcementRepository.createAnnouncement(announcement);
  },
  async getAllAnnouncements() {
    return await announcementRepository.getAllAnnouncements();
  },
  async getAnnouncementById(id) {
    return await announcementRepository.getAnnouncementById(id);
  },
  async updateAnnouncement(announcement) {
    return await announcementRepository.updateAnnouncement(announcement);
  },
  async deleteAnnouncement(id) {
    return await announcementRepository.deleteAnnouncement(id);
  }
};

module.exports = AnnouncementService;
