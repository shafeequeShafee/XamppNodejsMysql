const express = require('express')
const userRouter =express.Router()
const  {createUser,updateUser,getUserByUserId,getUsers,deleteUser,login} = require("../controllers/userController")
const {checkToken}= require("../auth/token_validation")

userRouter.post('/createUser',createUser)
userRouter.patch('/updateUser',checkToken,updateUser)
userRouter.get('/getUserByUserId/:id',getUserByUserId)
userRouter.get('/getUsers',getUsers)
userRouter.delete('/deleteUser',deleteUser)

userRouter.post('/login',login)


module.exports= userRouter