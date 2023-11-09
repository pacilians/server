const { securitiesAccountRepository } = require("../repository");

const SecuritiesAccountService = {
  async createSecuritiesAccount(securitiesAccount) {
    return await securitiesAccountRepository.createSecuritiesAccount(securitiesAccount);
  },
  async getSecuritiesAccountById(id) {
    return await securitiesAccountRepository.getSecuritiesAccountById(id);
  },
  async updateSecuritiesAccount(id, securitiesAccount) {
    return await securitiesAccountRepository.updateSecuritiesAccount(id, securitiesAccount);
  },
  async deleteSecuritiesAccount(id) {
    return await securitiesAccountRepository.deleteSecuritiesAccount(id);
  },
  async getAllSecuritiesAccounts() {
    const securitiesAccounts = await securitiesAccountRepository.getAllSecuritiesAccounts();
    return securitiesAccounts;
  }
};

module.exports = SecuritiesAccountService;
