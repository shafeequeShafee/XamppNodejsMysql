//npm i bcrypt
// npm i jsonwebtoken
const dotenv = require('dotenv');
dotenv.config();
const { sign } = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const AppError=require('../utils.js/appError')
const { create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail } = require('../service/userService')
module.exports = {

    //////  callback /////////

    createUser: (req, res, next) => {
        try {
            const body = req.body
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(body.password, salt, function (err, hash) {
                    if (err) return res.json({ error: true });
                    body.password = hash
                    create(body, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "Database Connection error"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            data: results
                        })

                    })


                });
            });
        }
        catch (err) {
            err.statusCode = 404
            next(err)
        }

    },
 
    /////////////   Promise   /////////////
    getUserByUserId: async(req, res,next) => {
        try{
            const id = req.params.id;
            const result = await getUserByUserId(id)
            if (!result) {
                // return res.status(404).json({
                //     success: 0,
                //     message: "Record is not found"
                // })
                // const err = new Error ("Record Not found")
                // err.statusCode ==404
                // throw err

                throw new AppError('Record not found', 404)
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
        catch(err){
           next(err)
        }
       
    },

    getUsers: (req, res) => {

        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record is not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })


        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(body.password, salt, function (err, hash) {
                if (err) return res.json({ error: true });
                body.password = hash
                updateUser(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database Connection error"
                        });
                    }
                    if (results.affectedRows <= 0) {
                        return res.status(404).json({
                            success: 0,
                            message: "Record is not found"
                        })
                    }

                    return res.status(200).json({
                        success: 1,
                        message: 'updated successfully'
                    })
                })

            });
        });

    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            if (results.affectedRows <= 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Record is not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'user deleted successfully'
            })
        })
    },

    login: (req, res) => {
        const body = req.body;

        getUserByUserEmail(body.email, (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    message: "invalid email or password"
                })
            }
            bcrypt.compare(body.password, results.password, function (err, result) {
                // result == true
                console.log(result)
                if (result) {
                    results.password = undefined;
                    // i dont need to pass the password in the jsonwebtoken parameter
                    const jsonwebtoken = sign({ result: results }, process.env.JSONWEBTOKEN_KEY, {
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        success: 1,
                        message: "login successfully",
                        token: jsonwebtoken
                    })
                }
                else {
                    return res.status(401).json({
                        success: 0,
                        data: "invalid email or password"
                    })
                }
            });



        })
    },
}