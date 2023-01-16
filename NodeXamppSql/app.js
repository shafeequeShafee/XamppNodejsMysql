//npm install --save-dev nodemon

const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const xamppRouter= require("./routers/xamppRouter");
const userRouter = require('./routers/user');


const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()) 
app.use('/xampp',xamppRouter)
app.use('/user',userRouter)
app.all('*',(req,res,next)=>{
    const err = new Error(`Requested URL ${req.path} not found !`)
    //// thazha common aayi middle ware eyuthiyath kond eth venda
    // res.status(404).json({
    //     success:0,
    //     message:err.message,
    //     stack:err.stack
    // })
    err.statusCode  = 404;
    next(err)
})

// special kind of middle ware , especially for error handling
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500  // 500 - internal server error
    res.status(statusCode).json({
        success:0,
        message:err.message,
        stack:err.stack
    })
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running 0n ${PORT}` )
})


