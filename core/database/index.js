const mysql = require('mysql2/promise');

const config = {
  host: '85.31.224.224',
  user: 'root',
  password: 'pass',
  database: 'master',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);

module.exports = pool;