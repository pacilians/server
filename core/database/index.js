const { response } = require("express");
const mysql = require("mysql2/promise");

const config = {
  host: "85.31.224.224",
  user: "root",
  password: "pass",
  database: "master",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const database = {
  async query(query, args) {
    let res = 1;
    try {
      const pool = mysql.createPool(config);
      res = await pool.query(query, args);
    } catch (error) {
      console.error(error);
      return null;
    }
    return res;
  },
};

module.exports = database;
