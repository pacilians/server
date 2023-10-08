const { response } = require("express");
const mysql = require("mysql2/promise");

const config = {
  host: "156.67.216.68",
  user: "root",
  password: "propensi2023",
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
