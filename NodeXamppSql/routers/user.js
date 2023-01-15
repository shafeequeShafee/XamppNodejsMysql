const express = require('express')
const userRouter =express.Router()
const  {createUser,updateUser,getUserByUserId,getUsers,deleteUser,login} = require("../controllers/userController")


userRouter.post('/createUser',createUser)
userRouter.patch('/updateUser',updateUser)
userRouter.get('/getUserByUserId/:id',getUserByUserId)
userRouter.get('/getUsers',getUsers)
userRouter.delete('/deleteUser',deleteUser)

userRouter.post('/login',login)


module.exports= userRouter