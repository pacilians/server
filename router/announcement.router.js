const express = require('express');
const router = express.Router();
const announcementController = require('../app/controller/announcement.controller')

const authJwt = require('../core/middleware/authjwt');
const { wrap } = require("../core/error/error-handler")

router.use(authJwt);
router.post('/', wrap(announcementController.createAnnouncement));
router.get('/', wrap(announcementController.getAllAnnouncements));
router.get("/:id", wrap(announcementController.getAnnouncementById));
router.put("/:id", wrap(announcementController.updateAnnouncement))
router.put("/pin/:id", wrap(announcementController.pinAnnouncement))
router.post("/:id/pin", wrap(announcementController.updateAnnouncementPin))
router.delete("/:id", wrap(announcementController.deleteAnnouncement))

module.exports = router;