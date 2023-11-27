const { response } = require("express");
const mysql = require("mysql2/promise");

const config = {
  host: "85.31.232.218",
  user: "root",
  password: "bnicustody",
  database: "master",
  waitForConnections: true,
};

const database = {
  async query(query, args) {
    let res = 1;
    try {
      const pool = mysql.createPool(config);
      res = await pool.query(query, args);
      await pool.end()
    } catch (error) {
      console.error(error);
      return null;
    }
    return res;
  },
};

module.exports = database;
