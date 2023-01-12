const express = require('express')
const xamppRouter =express.Router()
const  xamppController = require("../controllers/xamppController")


xamppRouter.post('/createEmployee',xamppController.createEmployee)
xamppRouter.get('/getEmployeesDetails',xamppController.getEmployeesDetails)
xamppRouter.get('/getEmployeesDetailById/:id',xamppController.getEmployeesDetailById)
xamppRouter.delete('/deleteEmployeesDetail/:id',xamppController.deleteEmployeesDetail)
xamppRouter.put('/updateEmployeeDetails',xamppController.updateEmployeeDetails)


module.exports= xamppRouter