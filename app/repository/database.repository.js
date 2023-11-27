const db = require("../../core/database");
const { v4: uuidv4 } = require("uuid");

const DatabaseRepository = {
  /**
   * Customer
   */
  async createCustomer(customer) {
    const id = uuidv4();
    const {
      name,
      address,
      telephone,
      expiry_date,
      business_category,
      service,
      key_person_name,
      key_person_dob,
      key_person_hp,
      email,
      birth_date
    } = customer;
    const created_at = new Date();
    const created = await db.query(
      "INSERT INTO customer (id, name, address, telephone, expiry_date, business_category, service, key_person_name, key_person_dob, key_person_hp, created_at, email, birth_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        id,
        name,
        address,
        telephone,
        expiry_date,
        business_category,
        service,
        key_person_name,
        key_person_dob,
        key_person_hp,
        created_at,
        email,
        birth_date
      ]
    );

    if (!created) return null;
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
      key_person_hp,
      email,
      birth_date
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
    const updated_at = new Date();

    return await db.query(
      "UPDATE customer SET name=?, address=?, telephone=?, expiry_date=?, business_category=?, service=?, key_person_name=?, key_person_dob=?, key_person_hp=?, updated_at=? WHERE id=?",
      [
        customer.name,
        customer.address,
        customer.telephone,
        customer.expiry_date,
        customer.business_category,
        customer.service,
        customer.key_person_name,
        customer.key_person_dob,
        customer.key_person_hp,
        updated_at,
        customer.id,
      ]
    );
  },
  async deleteCustomer(id) {
    await db.query("DELETE FROM customer WHERE id = ?", [id]);
  },
  async getAllCustomers() {
    const [rows] = await db.query(
      "SELECT `id`, `name`, `address`, `email`, `telephone`, `expiry_date`, `business_category`, `service`, `key_person_name`, `key_person_dob`, `key_person_hp`, `created_at`, `updated_at`, `status`, `comment`, `birth_date` FROM customer;"
    );
    return rows;
  },
  async updateCustomerStatus(id, status) {
    return await db.query("UPDATE customer SET status=? WHERE id=?", [
      status,
      id,
    ]);
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

    if (!created) return null;
    const createdBankAccount = {
      id,
      id_customer,
      number,
      name,
    };

    return createdBankAccount;
  },
  async deleteBankAccount(id) {
    await db.query("DELETE FROM bank_account WHERE id = ?", [id]);
  },
  async deleteBankAccountByCustomerId(id_customer) {
    await db.query("DELETE FROM bank_account WHERE id_customer = ?", [
      id_customer,
    ]);
  },
  async updateBankAccount(id, bankAccount) {
    const { number, name } = bankAccount;
    const [row] = await db.query(
      "UPDATE bank_account SET number=?, name=? WHERE id=?",
      [number, name, id]
    );

    if (row) return bankAccount;

    return null;
  },
  async getBankAccountByCustomerId(id_customer) {
    const [rows] = await db.query(
      "SELECT * FROM bank_account WHERE id_customer = ?",
      [id_customer]
    );
    return rows;
  },

  /**
   *  Board of Director
   */
  async createBoardOfDirector(boardOfDirector) {
    const id = uuidv4();
    const { id_customer, name, photo, npp, role, description, birth_date } =
      boardOfDirector;

    const created = await db.query(
      "INSERT INTO board_of_director (id, id_customer, name, photo, npp, role, description, birth_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
      [id, id_customer, name, photo, npp, role, description, birth_date]
    );

    if (!created) return null;
    const createdBoardOfDirector = {
      id,
      id_customer,
      name,
      photo,
      npp,
      role,
      description,
      birth_date,
    };

    return createdBoardOfDirector;
  },
  async updateBoardOfDirector(id, boardOfDirector) {
    const { name, photo, npp, role, description } = boardOfDirector;

    const updated = await db.query(
      "UPDATE board_of_director SET name = ?, photo = ?, npp = ?, role = ?, description = ?, birth_date = ? WHERE id = ?",
      [name, photo, npp, role, description, birth_date, id]
    );

    if (!updated) return null;

    const updatedBoardOfDirector = {
      id,
      name,
      photo,
      npp,
      role,
      description,
      birth_date,
    };

    return updatedBoardOfDirector;
  },
  async deleteBoardOfDirector(id) {
    await db.query("DELETE FROM board_of_director WHERE id = ?", [id]);
  },
  async deleteBoardOfDirectorByCustomerId(id_customer) {
    await db.query("DELETE FROM board_of_director WHERE id_customer = ?", [
      id_customer,
    ]);
  },
  async getBoardOfDirectorByCustomerId(id_customer) {
    const [rows] = await db.query(
      "SELECT * FROM board_of_director WHERE id_customer = ?",
      [id_customer]
    );
    return rows;
  },

  /**
   * File
   */

  async createCustomerFile(customerFile) {
    const { id_customer, name, type, file, created_at, updated_at } =
      customerFile;

    const result = await db.query(
      "INSERT INTO customer_file (id_customer, name, type, file, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?);",
      [id_customer, name, type, file, created_at, updated_at]
    );

    if (!result) return null;

    return {
      id: result.insertId,
      id_customer,
      name,
      type,
      file,
      created_at,
      updated_at,
    };
  },

  async getCustomerFileById(fileId) {
    const [rows] = await db.query("SELECT * FROM customer_file WHERE id = ?", [
      fileId,
    ]);

    console.log(rows, fileId);
    return rows[0];
  },

  async getCustomerFileByCustomerId(customer_id) {
    const [rows] = await db.query(
      "SELECT * FROM customer_file WHERE id_customer = ?",
      [customer_id]
    );
    return rows;
  },

  async updateCustomerFile(id, updatedFile) {
    const { file, updated_at } = updatedFile;

    const [row] = await db.query("UPDATE customer_file SET file=? WHERE id=?", [
      file,
      id,
    ]);

    if (row) return updatedFile;

    return null;
  },

  async deleteCustomerFile(fileId) {
    await db.query("DELETE FROM customer_file WHERE id = ?", [fileId]);
  },

  async getAllCustomerFiles() {
    const [rows] = await db.query("SELECT * FROM customer_file");
    return rows;
  },

  /**
   * Nasabah Approval
   */

  async getApprovalCommentByNasabahId(nasabah_id) {
    const [rows] = await db.query(
      "SELECT * FROM customer_comment WHERE id_customer = ?",
      [nasabah_id]
    );
    return rows;
  },

  async updateCommentCustomer(id_customer, comment) {
    const dt = new Date();
    const created = await db.query("UPDATE customer SET comment=? WHERE id=?", [
      comment,
      id_customer,
    ]);

    if (!created) return null;

    return comment;
  },

  async changeStatusNasabah(id_nasabah, status) {
    const [row] = await db.query("UPDATE customer SET status=? WHERE id=?", [
      status,
      id_nasabah,
    ]);

    if (row) return id_nasabah;

    return null;
  },
};

module.exports = DatabaseRepository;
