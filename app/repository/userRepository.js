const db = require("../../core/database");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const CryptoJS = require('crypto-js');

const UserRepository = {
  async createUser(user) {
    const id = uuidv4();
    const { email, name, npp, role, description } = user;

    const combinedString = email + name;
    const secretPassphrase = role;
    const password = CryptoJS.AES.encrypt(combinedString, secretPassphrase).toString();

    const created = await db.query(
      "INSERT INTO user (id, email, password, name, npp, role, description) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [id, email, password, name, npp, role, description]
    );

    if (!created)
      return null
    const createdUser = {
      id,
      email,
      name,
      npp,
      role,
      description
    };
  
    return createdUser;
  },
  async getUserById(userId) {
    const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);
    return rows[0];
  },
  async updateUser(id, user) {
    const { email, password, name, npp, role, description } = user;
    return await db.query(
      "UPDATE user SET email=?, password=?, name=?,  npp=?, role=?, description=? WHERE id=?",
      [email, password, name, npp, role, description, id]
    );
  },
  async deleteUser(id) {
    await db.query("DELETE FROM user WHERE id = ?", [id]);
  },
  async getAllUsers() {
    const [rows] = await db.query("SELECT * FROM user");
    return rows;
  },
  async getUserByEmail(email) {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
};

module.exports = UserRepository;
