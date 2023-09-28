const pool = require("../../core/database");

const UserRepository = {
  async createUser(user) {
    const [rows] = await pool.promise().query("INSERT INTO user SET ?", user);
    return rows.insertId;
  },
  async getUserById(id) {
    const [rows] = await pool
      .promise()
      .query("SELECT * FROM user WHERE id = ?", [id]);
    return rows[0];
  },
  async updateUser(id, user) {
    await pool.promise().query("UPDATE user SET ? WHERE id = ?", [user, id]);
  },
  async deleteUser(id) {
    await pool.promise().query("DELETE FROM user WHERE id = ?", [id]);
  },
  async getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM user');
    return rows;
  },
  async getUserByEmail(email) {
    const [rows] = await pool
      .query("SELECT * FROM user WHERE email = ?", [email]);
    console.log(rows);
    console.log(rows[0]);
    return rows[0];
  },
};

module.exports = UserRepository;
