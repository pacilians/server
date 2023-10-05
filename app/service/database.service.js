const DatabaseRepository = require("../repository/database.repository");

const DatabaseService = {

  async createCustomer(customer) {
    return await DatabaseRepository.createCustomer(customer);
  },

  async getCustomerById(customerId) {
    return await DatabaseRepository.getCustomerById(customerId);
  },

  async updateCustomer(id, customer) {
    return await DatabaseRepository.updateCustomer(id, customer);
  },

  async deleteCustomer(id) {
    return await DatabaseRepository.deleteCustomer(id);
  },

  async getAllCustomers() {
    return await DatabaseRepository.getAllCustomers();
  },

  async createBankAccount(bankAccount) {
    return await DatabaseRepository.createBankAccount(bankAccount);
  },

  async deleteBankAccount(id) {
    return await DatabaseRepository.deleteBankAccount(id);
  },

  async createBoardOfDirector(boardOfDirector) {
    return await DatabaseRepository.createBoardOfDirector(boardOfDirector);
  },

  async deleteBoardOfDirector(id) {
    return await DatabaseRepository.deleteBoardOfDirector(id);
  },

};

module.exports = DatabaseService;
