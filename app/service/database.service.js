const { databaseRepository } = require("../repository");
const { Customer, BoardOfDirector, BankAccount } = require("../../core/model");

const DatabaseService = {
  /**
   *
   * Database
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
    customer.bank_account = banks;
    customer.board_of_director = bods;
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

    await databaseRepository.updateCustomer(id, updatedCustomer);

    return updatedCustomer;
  },

  async deleteCustomer(id) {
    let customer = await databaseRepository.getCustomerById(id);
    await databaseRepository.deleteBankAccountByCustomerId(customer.id)
    await databaseRepository.deleteBoardOfDirectorByCustomerId(customer.id)
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
   * Database
   * Bank Account Field Related
   */
  async createBankAccount(bankAccount) {
    return await databaseRepository.createBankAccount(bankAccount);
  },

  async deleteBankAccount(id) {
    return await databaseRepository.deleteBankAccount(id);
  },
  async updateBankAccount(id, bankAccount) {
    const updatedBankAccount = await databaseRepository.updateBankAccount(id, bankAccount);
    return updatedBankAccount;
  },

  /**
   *
   * Database
   * Board of Director Field Related
   */
  async createBoardOfDirector(boardOfDirector) {
    return await databaseRepository.createBoardOfDirector(boardOfDirector);
  },

  async deleteBoardOfDirector(id) {
    return await databaseRepository.deleteBoardOfDirector(id);
  },
  async updateBoardOfDirector(id, boardOfDirector) {
    const updatedBOD =  await databaseRepository.updateBoardOfDirector(id, boardOfDirector);
    return updatedBOD;
  },

  /**
   *
   * Database
   * Files Related
   */
};

module.exports = DatabaseService;
