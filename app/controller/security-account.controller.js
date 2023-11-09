const { plainToClass } = require("class-transformer");
const { SecuritiesAccount } = require("../../core/model");
const JsonResponse = require("../../core/response");
const { securitiesAccountService } = require("../service");

const SecuritiesAccountController = {
  async createSecuritiesAccount(req, res) {
    const securitiesAccount = plainToClass(SecuritiesAccount, req.body);
    const createdSecuritiesAccount = await securitiesAccountService.createSecuritiesAccount(securitiesAccount);
    const response = new JsonResponse(
      200,
      { securitiesAccount: createdSecuritiesAccount },
      "Success creating securities account"
    );

    if (!createdSecuritiesAccount) {
      response.message = "Failed creating securities account";
      response.status = 500;
    }
    response.send(res);
  },

  async deleteSecuritiesAccount(req, res) {
    const id = req.params.id;
    await securitiesAccountService.deleteSecuritiesAccount(id);
    const response = new JsonResponse(200, {}, "Securities account has been deleted");
    response.send(res);
  },
  
  async updateSecuritiesAccount(req, res) {
    const id = req.params.id;
    const securitiesAccount = plainToClass(SecuritiesAccount, req.body);
    const updated = await securitiesAccountService.updateSecuritiesAccount(id, securitiesAccount);

    const response = new JsonResponse(
      200,
      { updated: updated },
      "Success updating securities account"
    );

    if (!updated) {
      response.message = "Failed updating securities account";
      response.status = 500;
    }

    response.send(res);
  },

  async getAllSecuritiesAccounts(req, res) {
    const securitiesAccounts = await securitiesAccountService.getAllSecuritiesAccounts();
    const response = new JsonResponse(
      200,
      { securitiesAccounts: securitiesAccounts },
      "Success fetching securities accounts"
    );
    response.send(res);
  },

  async getSecuritiesAccountById(req, res){
    const id = req.params.id;
    const account = await securitiesAccountService.getSecuritiesAccountById(id);
    const response = new JsonResponse(200, {}, "");

    if (!account) {
      response.message = "Account not found";
      response.status = 404;
    } else {
      response.data = { securitiesAccount: account };
    }

    if (account === null) {
      response.message = "Internal server error";
      response.status = 500;
    }

    response.send(res);
  }
};

module.exports = SecuritiesAccountController;
