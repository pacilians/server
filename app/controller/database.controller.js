const { databaseService } = require("../service");
const { plainToClass } = require("class-transformer");
const JsonResponse = require("../../core/response");

const DatabaseController = {
  async createCustomer(req, res) {
    const customer = req.body;
    const createdCustomer = await DatabaseService.createCustomer(customer);
    const response = new JsonResponse(
      201,
      { customer: createdCustomer },
      "Customer has been created"
    );
    response.send(res);
  },

  async getDetailCustomer(req, res) {
    const customerId = req.params.id;
    const customer = await DatabaseService.getCustomerById(customerId);
    const response = new JsonResponse(
      200,
      { customer },
      "Customer has been retrieved"
    );
    response.send(res);
  },

  async updateCustomer(req, res) {
    const id = req.params.id;
    const customer = req.body;
    await DatabaseService.updateCustomer(id, customer);
    const response = new JsonResponse(200, {}, "Customer has been updated");
    response.send(res);
  },

  async deleteCustomer(req, res) {
    const id = req.params.id;
    await DatabaseService.deleteCustomer(id);
    const response = new JsonResponse(200, {}, "Customer has been deleted");
    response.send(res);
  },

  async getAllCustomers(req, res) {
    const customers = await DatabaseService.getAllCustomers();
    const response = new JsonResponse(
      200,
      { customers },
      "All customers have been retrieved"
    );
    response.send(res);
  },

  async createBankAccount(req, res) {
    const bankAccount = req.body;
    const createdBankAccount = await DatabaseService.createBankAccount(
      bankAccount
    );
    const response = new JsonResponse(
      201,
      { bankAccount: createdBankAccount },
      "Bank account has been created"
    );
    response.send(res);
  },

  async deleteBankAccount(req, res) {
    const id = req.params.id;
    await DatabaseService.deleteBankAccount(id);
    const response = new JsonResponse(200, {}, "Bank account has been deleted");
    response.send(res);
  },

  async createBoardOfDirector(req, res) {
    const boardOfDirector = req.body;
    const createdBoardOfDirector = await DatabaseService.createBoardOfDirector(
      boardOfDirector
    );
    const response = new JsonResponse(
      201,
      { boardOfDirector: createdBoardOfDirector },
      "Board of director has been created"
    );
    response.send(res);
  },

  async deleteBoardOfDirector(req, res) {
    const id = req.params.id;
    await DatabaseService.deleteBoardOfDirector(id);
    const response = new JsonResponse(
      200,
      {},
      "Board of director has been deleted"
    );
    response.send(res);
  },
};

module.exports = DatabaseController;
