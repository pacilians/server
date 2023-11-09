const User = require("./user.model")
const Customer = require("./customer.model")
const Announcement = require("./announcement.model")
const BoardOfDirector = require("./board-director.model")
const BankAccount = require("./bank-account.model")
const CustomerFile = require("./customer-file.model")
const Audit = require("./audit.model")
const AuditEvent = require("./audit-event.model")
const CustomerComment = require("./customer-comment.model")
const SecuritiesAccount = require("./securities-account.model")

module.exports = {
    User,
    Announcement,
    Customer,
    BoardOfDirector,
    BankAccount,
    CustomerFile,
    Audit,
    AuditEvent,
    CustomerComment,
    SecuritiesAccount
}