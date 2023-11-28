const userService = require("./user.service")
const masterDataService = require("./master-data.service")
const announcementService = require("./announcement.service")
const databaseService = require("./database.service")
const auditService = require("./audit.service")
const securitiesAccountService = require("./security-account.service")
const notificationService = require("./notification.service")
const assetService = require("./asset.service")

module.exports = {
    userService,
    masterDataService,
    announcementService,
    databaseService,
    auditService,
    securitiesAccountService,
    notificationService,
    assetService
}