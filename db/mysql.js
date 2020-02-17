const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'samochodzik',
  multipleStatements: true,
  charset: 'utf8'
});

module.exports = pool.promise();
