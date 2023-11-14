const { databaseRepository, masterDataRepository } = require("../repository");
const masterDataService = require("./master-data.service")
const {
  Customer,
  BoardOfDirector,
  BankAccount,
  CustomerFile,
} = require("../../core/model");

const DatabaseService = {
  /**
   * Database Core Customer
   * Customer Field Related
   */
  async createCustomer(customer) {
    const to_bank_account = customer.bank_account;
    const to_board_of_director = customer.board_of_director;
    let cst = await databaseRepository.createCustomer(customer);
    let addedCustomer = new Customer();
    addedCustomer.spread(cst);

    for (let i = 0; i < to_bank_account.length; i++) {
      let to_add = to_bank_account[i];
      to_add.id_customer = addedCustomer.id;
      let account = await databaseRepository.createBankAccount(to_add);
      if (account) {
        let bank_account = new BankAccount();
        bank_account.spread(account);
        addedCustomer.addBankAccount(bank_account);
      }
    }
    for (let i = 0; i < to_board_of_director.length; i++) {
      let to_add = to_board_of_director[i];
      to_add.id_customer = addedCustomer.id;
      let addBod = await databaseRepository.createBoardOfDirector(to_add);
      if (addBod) {
        let bod = new BoardOfDirector();
        bod.spread(addBod);
        addedCustomer.addBoardOfDirector(bod);
      }
    }

    const mandatoryFile = await masterDataRepository.getAllMandatory();

    Promise.all(
      mandatoryFile.map(async (ctx) => {
        const customerFileData = {
          id_customer: addedCustomer.id,
          name: ctx.name,
          type: "MANDATORY",
          file: null,
          created_at: new Date(),
          updated_at: new Date(),
        };

        await this.createCustomerFile(customerFileData);
      })
    );

    return addedCustomer;
  },

  async getCustomerById(customerId) {
    let customer = await databaseRepository.getCustomerById(customerId);
    let banks = await databaseRepository.getBankAccountByCustomerId(
      customer.id
    );
    let bods = await databaseRepository.getBoardOfDirectorByCustomerId(
      customer.id
    );

    let files = await databaseRepository.getCustomerFileByCustomerId(
      customer.id
    );

    let file = [];
    let mandatory = [];
    let additional = [];
    let all = files.forEach((ctx) => {
      let add = {
        id: ctx.id,
        id_customer: ctx.id_customer,
        name: ctx.name,
        type: ctx.type,
        created_at: ctx.created_at,
        updated_at: ctx.updated_at,
      };

      file.push(add);

      if (ctx.type === "MANDATORY") mandatory.push(add);

      if (ctx.type === "ADDITIONAL") additional.push(add);
    });
    customer.bank_account = banks;
    customer.board_of_director = bods;
    customer.file = all;  
    customer.mandatory_file = mandatory;
    customer.additional_file = additional;

    return customer;
  },

  async updateCustomer(id, customer) {
    let cst = await databaseRepository.getCustomerById(id);
    let updatedCustomer = new Customer();
    updatedCustomer.spread(cst);

    if (customer.name) {
      updatedCustomer.name = customer.name;
    }
    if (customer.address) {
      updatedCustomer.address = customer.address;
    }
    if (customer.phone) {
      updatedCustomer.phone = customer.phone;
    }
    if (customer.email) {
      updatedCustomer.email = customer.email;
    }
    if (customer.service) {
      updatedCustomer.service = customer.service;
    }
    if (customer.business_category) {
      updatedCustomer.business_category = customer.business_category;
    }
    if (customer.expiry_date) {
      updatedCustomer.expiry_date = customer.expiry_date;
    }
    if (customer.key_person_name) {
      updatedCustomer.key_person_name = customer.key_person_name;
    }
    if (customer.key_person_hp) {
      updatedCustomer.key_person_hp = customer.key_person_hp;
    }
    if (customer.key_person_dob) {
      updatedCustomer.key_person_dob = customer.key_person_dob;
    }

    await databaseRepository.updateCustomer(id, updatedCustomer);

    return updatedCustomer;
  },

  async deleteCustomer(id) {
    let customer = await databaseRepository.getCustomerById(id);
    await databaseRepository.deleteBankAccountByCustomerId(customer.id);
    await databaseRepository.deleteBoardOfDirectorByCustomerId(customer.id);
    await databaseRepository.deleteCustomer(id);
    return customer;
  },

  async getAllCustomers() {
    let res = [];
    const list_customer = await databaseRepository.getAllCustomers();

    for (let i = 0; i < list_customer.length; i++) {
      let customer = list_customer[i];
      let addedCustomer = new Customer();
      addedCustomer.spread(customer);
      
      let banks = await databaseRepository.getBankAccountByCustomerId(
        customer.id
      );
      for (let j = 0; j < banks.length; j++) {
        let account = banks[j];
        let bank_account = new BankAccount();
        bank_account.spread(account);
        addedCustomer.addBankAccount(bank_account);
      }
      let bods = await databaseRepository.getBoardOfDirectorByCustomerId(
        customer.id
      );
      for (let j = 0; j < bods.length; j++) {
        let bod = bods[j];
        let board_of_director = new BoardOfDirector();
        board_of_director.spread(bod);
        addedCustomer.addBoardOfDirector(board_of_director);
      }
      res.push(addedCustomer);
    }
    return res;
  },

  /**
   *
   * Database Bak Account
   * Bank Account Field Related
   */
  async createBankAccount(bankAccount) {
    return await databaseRepository.createBankAccount(bankAccount);
  },

  async deleteBankAccount(id) {
    return await databaseRepository.deleteBankAccount(id);
  },
  async updateBankAccount(id, bankAccount) {
    const updatedBankAccount = await databaseRepository.updateBankAccount(
      id,
      bankAccount
    );
    return updatedBankAccount;
  },

  /**
   *
   * Database BOD
   * Board of Director Field Related
   */
  async createBoardOfDirector(boardOfDirector) {
    return await databaseRepository.createBoardOfDirector(boardOfDirector);
  },

  async deleteBoardOfDirector(id) {
    return await databaseRepository.deleteBoardOfDirector(id);
  },
  async updateBoardOfDirector(id, boardOfDirector) {
    const updatedBOD = await databaseRepository.updateBoardOfDirector(
      id,
      boardOfDirector
    );
    return updatedBOD;
  },

  /**
   *
   * Database Files
   * Files Related
   */

  async createCustomerFile(customerFile) {
    const createdFile = await databaseRepository.createCustomerFile(
      customerFile
    );
    if (!createdFile) return null;

    const addedCustomerFile = new CustomerFile();
    addedCustomerFile.spread(createdFile);

    return addedCustomerFile;
  },

  async getCustomerFileById(fileId) {
    const file = await databaseRepository.getCustomerFileById(fileId);
    return file;
  },

  async getCustomerFileByCustomerId(customerId) {
    const file = await databaseRepository.getCustomerFileByCustomerId(
      customerId
    );
    return file;
  },

  async updateCustomerFile(id, updatedFile) {
    let updatedCustomerFile = await databaseRepository.updateCustomerFile(
      id,
      updatedFile
    );
    updatedCustomerFile.file = "";
    return updatedCustomerFile;
  },

  async deleteCustomerFile(id) {
    await databaseRepository.deleteCustomerFile(id);
  },

  async getAllCustomerFiles() {
    const files = await databaseRepository.getAllCustomerFiles();
    return files;
  },

  async checklist(){
    let response = {}
    let customer = await this.getAllCustomers()
    let mandatoryFile = await masterDataService.getAllMandatory()

    // response.column = 

    // Getting Columns
    let col = []
    for(let i = 0; i < mandatoryFile.length; i ++){
      col.push(mandatoryFile[i].name)
    }
    response.column = col;
    response.checklist = []


    // Checking to each files of customer
    for(let i = 0; i < customer.length; i ++){
      const cust = customer[i]
      const files = await this.getCustomerFileByCustomerId(cust.id)

      let check = {}

      for (let index = 0; index < mandatoryFile.length; index ++){
        check[mandatoryFile[index].name] = 0
      }

      for(let index = 0; index < files.length; index ++){
        if(check.hasOwnProperty(files[index].name)){
          if(files[index].file !== null)
            check[files[index].name] = 1
        }
      }

      let cur = response.checklist
      cur.push({
        id: customer[i].id,
        name: customer[i].name,
        check : check
      })
      response.checklist = cur;
    }
    return response
  },

  /**
   * Nasabah Approval
   */
  async changeStatusCustomer(id_customer, status){
    return databaseRepository.changeStatusNasabah(id_customer, status);
  },
  async updateCommentCustomer(id_customer, comment){
    return databaseRepository.updateCommentCustomer(id_customer, comment);
  },
  async listCommentCustomer(id_customer){
    return databaseRepository.getApprovalCommentByNasabahId(id_customer)
  }

};

module.exports = DatabaseService;
