const mysql = require('mysql');
require('dotenv').config()

let con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database:process.env.DB_NAME
  });
  con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
     });
 

  module.exports = con;