const { databaseService } = require("../service");
const { plainToClass } = require("class-transformer");
const JsonResponse = require("../../core/response");
const { Customer, CustomerComment } = require("../../core/model");

const DatabaseController = {
  /**
   * Customer
   */

  async createCustomer(req, res) {
    const customer = plainToClass(Customer, req.body);
    customer.expiry_date = new Date();
    const createdCustomer = await databaseService.createCustomer(customer);

    const response = new JsonResponse(
      201,
      { customer: createdCustomer },
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

  /**
   * Bank Account
   */

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
    const response = new JsonResponse(
      200,
      { bank_account: newACC },
      "Bank Account has been updated"
    );

    if (!newACC)
      response = new JsonResponse(
        500,
        { bank_account: null },
        "Bank Account failed to update"
      );

    response.send(res);
  },

  /**
   * BOD
   */

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
    const response = new JsonResponse(
      200,
      { bod: newBOD },
      "BoardOfDirector has been updated"
    );
    response.send(res);
  },

  /**
   * Customer Files
   */

  async createCustomerFile(req, res) {
    let resp = new JsonResponse(200, null, "");
    try {
      const file_data = req.file;
      const file_name = req.body.name;
      const customer_id = req.params.customerId;
      const type = req.body.type;

      const customerFileData = {
        id_customer: customer_id,
        name: file_name,
        type: type,
        file: file_data.buffer,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const createdCustomerFile = await databaseService.createCustomerFile(
        customerFileData
      );

      if (createdCustomerFile) {
        resp.status = 201;
        resp.message = "File has been created";
        resp.data = createdCustomerFile;
        resp.send(res);
      } else {
        resp.status = 500;
        resp.message = "Error while uploading the file";
        resp.data = null;
        resp.send(res);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      resp.status = 500;
      resp.message = "Error while uploading the file";
      resp.send(res);
    }
  },

  async updateCustomerFile(req, res) {
    let resp = new JsonResponse(200, null, "");
    try {
      const file_data = req.file;
      const file_id = req.params.fileId;

      const customerFileData = {
        file: file_data.buffer,
        updated_at: new Date(),
      };

      const createdCustomerFile = await databaseService.updateCustomerFile(
        file_id,
        customerFileData
      );

      if (createdCustomerFile) {
        resp.status = 201;
        resp.message = "File has been updated";
        resp.data = createdCustomerFile;
        resp.send(res);
      } else {
        resp.status = 500;
        resp.message = "Error while uploading the file";
        resp.data = null;
        resp.send(res);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      resp.status = 500;
      resp.message = "Error while uploading the file";
      resp.send(res);
    }
  },

  async deleteCustomerFile(req, res) {
    const id = req.params.file;
    await databaseService.deleteCustomerFile(id);
    const response = new JsonResponse(
      200,
      {},
      "Customer file has been deleted"
    );
    response.send(res);
  },

  async getDetailFile(req, res) {
    const fileId = req.params.fileId;
    const files = await databaseService.getCustomerFileById(fileId);
    console.log(files);
    const response = new JsonResponse(
      200,
      { files },
      "File has been retrieved"
    );
    response.send(res);
  },

  async checklist(req, res) {
    const checklist = await databaseService.checklist();
    const response = new JsonResponse(
      200,
      checklist,
      "File has been retrieved"
    );
    response.send(res);
  },

  /**
   * Approval Nasabah
   */
  async createCustomerComment(req, res) {
    const id = req.params.id;
    const comment = plainToClass(CustomerComment, req.body);
    comment.id_customer = id
    const createdComment = await databaseService.createCommentCustomer(comment);

    const response = new JsonResponse(
      201,
      { customer: createdComment },
      "Comment has been created"
    );
    response.send(res);
  },

  async updateStatusCustomer(req, res) {
    const id = req.params.id;

    const { status } = req.body;

    const updated = await databaseService.changeStatusCustomer(id, status);

    const response = new JsonResponse(200, {}, "Status has been updated");
    response.send(res);
  },

  async listCustomerComment(req, res){
    const id = req.params.id;

    const comment = await databaseService.listCommentCustomer(id)

    const response = new JsonResponse(
      200,
      { comment: comment },
      "Comment has been retrieved"
    );
    response.send(res);
  },

  async listCustomerToApprove(req, res){
    const customers = await databaseService.getAllCustomers();
    const filtered = customers.filter((ctx)=> ctx.status === 0)
    const response = new JsonResponse(
      200,
      { customers: filtered },
      "All customers who need approval have been retrieved"
    );
    response.send(res);
  }
};

module.exports = DatabaseController;
