const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const mysqlConnection = mysql.createConnection({
   
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});


mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("connected to mySql");
  });

module.exports = mysqlConnection;