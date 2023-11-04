const userRepository = require("./user.repository")
const masterDataRepository = require("./master-data.repository")
const announcementRepository = require("./announcement.repository")
const databaseRepository = require("./database.repository")
const auditRepository = require("./audit.repository")
const securitiesAccountRepository = require("./security-account.repository")

module.exports = {
    userRepository,
    masterDataRepository,
    announcementRepository,
    databaseRepository,
    auditRepository,
    securitiesAccountRepository,
}