const { masterDataRepository } = require("../repository");

const MasterDataService = {
  async getAllBusiness() {
    return await masterDataRepository.getAllBusiness();
  },
  async createBusiness(name) {
    return await masterDataRepository.createBusiness(name);
  },
  async deleteBusiness(id) {
    return await masterDataRepository.deleteBusiness(id);
  },
  async getAllService() {
    return await masterDataRepository.getAllService();
  },
  async createService(name) {
    return await masterDataRepository.createService(name);
  },
  async deleteService(id) {
    return await masterDataRepository.deleteService(id);
  },
  async getAllMandatory() {
    return await masterDataRepository.getAllMandatory();
  },
  async createMandatory(name) {
    return await masterDataRepository.createMandatory(name);
  },
  async deleteMandatory(id) {
    return await masterDataRepository.deleteMandatory(id);
  },
};

module.exports = MasterDataService