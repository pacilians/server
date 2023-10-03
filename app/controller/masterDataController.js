const { plainToClass } = require("class-transformer");
const JsonResponse = require("../../core/response");
const { masterDataService } = require("../service");

const MasterDataController = {
  async getAllBusiness(req, res) {
    const business = await masterDataService.getAllBusiness();
    const response = new JsonResponse(200, { business: business }, "");

    if (!business) {
      response.message = "Failed fetching business category";
      response.status = 500;
    }
    response.send(res);
  },

  async createBusiness(req, res) {
    const { name } = req.body;
    const createdBusiness = await masterDataService.createBusiness(name);
    const response = new JsonResponse(
      200,
      { user: createdBusiness },
      "Success creating business"
    );

    if (!createdBusiness) {
      response.message = "Failed creating business category";
      response.status = 500;
    }
    response.send(res);
  },

  async deleteBusiness(req, res) {
    const id = req.params.id;
    await masterDataService.deleteBusiness(id)
    const response = new JsonResponse(200, {}, "Business category has been deleted");
    response.send(res);
  },

  async getAllService(req, res) {
    const service = await masterDataService.getAllService();
    const response = new JsonResponse(200, { service: service }, "");

    if (!service) {
      response.message = "Failed fetching service category";
      response.status = 500;
    }
    response.send(res);
  },

  async createService(req, res) {
    const { name } = req.body;
    const createdService = await masterDataService.createService(name);
    const response = new JsonResponse(
      200,
      { user: createdService },
      "Success creating service"
    );

    if (!createdService) {
      response.message = "Failed creating service category";
      response.status = 500;
    }
    response.send(res);
  },

  async deleteService(req, res) {
    const id = req.params.id;
    await masterDataService.deleteService(id)
    const response = new JsonResponse(200, {}, "Service category has been deleted");
    response.send(res);
  },

  async getAllMandatory(req, res) {
    const mandatory = await masterDataService.getAllMandatory();
    const response = new JsonResponse(200, { mandatory: mandatory }, "");

    if (!mandatory) {
      response.message = "Failed fetching mandatory category";
      response.status = 500;
    }
    response.send(res);
  },

  async createMandatory(req, res) {
    const { name } = req.body;
    const createdMandatory = await masterDataService.createMandatory(name);
    const response = new JsonResponse(
      200,
      { user: createdMandatory },
      "Success creating mandatory"
    );

    if (!createdMandatory) {
      response.message = "Failed creating mandatory category";
      response.status = 500;
    }
    response.send(res);
  },

  async deleteMandatory(req, res) {
    const id = req.params.id;
    await masterDataService.deleteMandatory(id)
    const response = new JsonResponse(200, {}, "Mandatory category has been deleted");
    response.send(res);
  },
};

module.exports = MasterDataController;
