const express = require('express');
const router = express.Router();
const announcementController = require('../app/controller/announcement.controller')

const authJwt = require('../core/middleware/authjwt');

router.use(authJwt);
router.post('/', announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.get("/:id", announcementController.getAnnouncementById);
router.put("/:id", announcementController.updateAnnouncement)
router.put("/pin/:id", announcementController.pinAnnouncement)
router.post("/:id/pin", announcementController.updateAnnouncementPin)
router.delete("/:id", announcementController.deleteAnnouncement)

module.exports = router;