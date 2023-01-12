//npm install --save-dev nodemon

const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const xamppRouter= require("./routers/xamppRouter")

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()) 
app.use('/xampp',xamppRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running 0n ${PORT}` )
})


