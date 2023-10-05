const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');

const DatabaseRepository = {

  /**
   * Customer
   */
  async createCustomer(customer) {
    const id = uuidv4();
    const { name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp } = customer;

    const created = await db.query(
      "INSERT INTO customer (id, name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [id, name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp]
    );

    if (!created)
      return null
    const createdCustomer = {
      id,
      name,
      address,
      telephone,
      expiry_date,
      business_category,
      service,
      key_person_name,
      key_person_dob,
      key_person_hp
    };
  
    return createdCustomer;
  },
  async getCustomerById(customerId) {
    const [rows] = await db.query("SELECT * FROM customer WHERE id = ?", [
      customerId,
    ]);
    return rows[0];
  },
  async updateCustomer(id, customer) {
    const { name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp } = customer;
    return await db.query(
      "UPDATE customer SET name=?, address=?, telephone=?, expiry_date=?, business_category=?, service=?, key_person_name=?, key_person_dob=?, key_person_hp=? WHERE id=?",
      [name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp, id]
    );
  },
  async deleteCustomer(id) {
    await db.query("DELETE FROM customer WHERE id = ?", [id]);
  },
  async getAllCustomers() {
    const [rows] = await db.query("SELECT * FROM customer");
    return rows;
  },


   /**
   *  Bank Account
   */
  async createBankAccount(bankAccount) {
    const id = uuidv4();
    const { id_customer, number, name } = bankAccount;

    const created = await db.query(
      "INSERT INTO bank_account (id, id_customer, number, name) VALUES (?, ?, ?, ?);",
      [id, id_customer, number, name]
    );

    if (!created)
      return null
    const createdBankAccount = {
      id,
      id_customer,
      number,
      name
    };
  
    return createdBankAccount;
  },
  async deleteBankAccount(id) {
    await db.query("DELETE FROM bank_account WHERE id = ?", [id]);
  },


   /**
   *  Board of Director
   */
  async createBoardOfDirector(boardOfDirector) {
    const id = uuidv4();
    const { id_customer, name, photo, npp, role, description } = boardOfDirector;

    const created = await db.query(
      "INSERT INTO board_of_director (id, id_customer, name, photo, npp, role, description) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [id, id_customer, name, photo, npp, role, description]
    );

    if (!created)
      return null
    const createdBoardOfDirector = {
      id,
      id_customer,
      name,
      photo,
      npp,
      role,
      description
    };
  
    return createdBoardOfDirector;
  },
  async deleteBoardOfDirector(id) {
    await db.query("DELETE FROM board_of_director WHERE id = ?", [id]);
  },
};

module.exports = DatabaseRepository;
