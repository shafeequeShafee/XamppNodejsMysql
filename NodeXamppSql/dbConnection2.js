const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool =mysql.createPool({
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    multipleStatements: true
})

module.exports= pool