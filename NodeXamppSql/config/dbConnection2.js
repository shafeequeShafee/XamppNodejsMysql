//https://www.npmjs.com/package/mysql
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool =mysql.createPool({
    port:process.env.DB_PORT,
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
    password:process.env.DB_PASSWORD
})

module.exports= pool