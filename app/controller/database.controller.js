const { databaseService } = require("../service");
const { plainToClass } = require("class-transformer");
const JsonResponse = require("../../core/response");
const { Customer } = require("../../core/model")

const DatabaseController = {
  async createCustomer(req, res) {

    const customer = plainToClass(Customer, req.body);
    const createdCustomer = await databaseService.createCustomer(customer);

    const response = new JsonResponse(
      201,
      { customer: customer },
      "Customer has been created"
    );
    response.send(res);
  },

  async getDetailCustomer(req, res) {
    const customerId = req.params.id;
    const customer = await databaseService.getCustomerById(customerId);
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
    await databaseService.updateCustomer(id, customer);
    const response = new JsonResponse(200, {}, "Customer has been updated");
    response.send(res);
  },

  async deleteCustomer(req, res) {
    const id = req.params.id;
    await databaseService.deleteCustomer(id);
    const response = new JsonResponse(200, {}, "Customer has been deleted");
    response.send(res);
  },

  async getAllCustomers(req, res) {
    const customers = await databaseService.getAllCustomers();
    const response = new JsonResponse(
      200,
      { customers },
      "All customers have been retrieved"
    );
    response.send(res);
  },


  async createBankAccount(req, res) {
    const bankAccount = req.body;
    const createdBankAccount = await databaseService.createBankAccount(
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
    await databaseService.deleteBankAccount(id);
    const response = new JsonResponse(200, {}, "Bank account has been deleted");
    response.send(res);
  },
  async updateBankAccount(req, res) {
    const id = req.params.id;
    const bankacc = req.body;
    const newACC = await databaseService.updateBankAccount(id, bankacc);
    const response = new JsonResponse(200, {bank_account : newACC}, "Bank Account has been updated");

    if(!newACC)
      response = new JsonResponse(500, {bank_account : null}, "Bank Account failed to update");

    response.send(res);
  },


  async createBoardOfDirector(req, res) {
    const boardOfDirector = req.body;
    const createdBoardOfDirector = await databaseService.createBoardOfDirector(
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
    await databaseService.deleteBoardOfDirector(id);
    const response = new JsonResponse(
      200,
      {},
      "Board of director has been deleted"
    );
    response.send(res);
  },

  async updateBoardOfDirector(req, res) {
    const id = req.params.id;
    const bod = req.body;
    const newBOD = await databaseService.updateBoardOfDirector(id, bod);
    const response = new JsonResponse(200, {bod: newBOD}, "BoardOfDirector has been updated");
    response.send(res);
  },
};

module.exports = DatabaseController;
