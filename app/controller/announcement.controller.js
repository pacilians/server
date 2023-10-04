
const { plainToClass } = require("class-transformer");
const { Announcement } = require("../../core/model")
const JsonResponse = require("../../core/response");
const { announcementService } = require("../service");

const AnnouncementController = {
  async createAnnouncement(req, res) {
    const announcement = plainToClass(Announcement, req.body);

    const user = req.user
    announcement.id_user = user.id

    const createdAnnouncement = await announcementService.createAnnouncement(announcement);
    const response = new JsonResponse(
      200,
      { announcement: createdAnnouncement },
      "Success creating announcement"
    );

    if (!createdAnnouncement) {
      response.message = "Failed creating announcement";
      response.status = 500;
    }
    response.send(res);
  },

  async updateAnnouncement(req, res) {
    const id = req.params.id;
    const announcement = plainToClass(Announcement, req.body);
    const updatedAnnouncement = await announcementService.updateAnnouncement(id, announcement);
    const response = new JsonResponse(
      200,
      { announcement: updatedAnnouncement },
      "Successfull updated announcement"
    );
    response.send(res);
  },

  async getAnnouncementById(req, res) {
    const id = req.params.id;
    const announcement = await announcementService.getAnnouncementById(id);
    const response = new JsonResponse(200, {}, "");

    if (!announcement) {
      response.message = "Announcement not found";
      response.status = 404;
    } else {
      response.data = { announcement };
    }

    if (announcement === null) {
      response.message = "Internal server error";
      response.status = 500;
    }

    response.send(res);
  },

  async getAllAnnouncements(req, res) {
    const announcements = await announcementService.getAllAnnouncements();
    const response = new JsonResponse(200, { announcements: announcements }, "");
    response.send(res);
  },
  async deleteAnnouncement(req, res) {
    const id = req.params.id;
    await announcementService.deleteAnnouncement(id);
    const response = new JsonResponse(200, {}, "Announcement has been deleted");
    response.send(res);
  },
};

module.exports = AnnouncementController;


