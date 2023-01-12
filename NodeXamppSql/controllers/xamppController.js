
const pool = require('../dbConnection2')

const createEmployee = async (req, res) => {
    try {

        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log(`connected as id ${connection.threadId}`)
            const params = req.body
            connection.query('INSERT INTO  employes SET ?',params, (err, rows) => {
                connection.release() // return to connection pool
                if (!err) {
                    res.send(`employee with the Record name : ${params.name} has been inserted`)
                }
                else {
                    console.log(err)
                }
            })
        })
    }

    catch (error) {
        console.error(error);
        res.render("400");
    }
}
const getEmployeesDetails = async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log(`connected as id ${connection.threadId}`)
            // query(sqlString , callback)
            connection.query('SELECT * from employes', (err, rows) => {
                connection.release() // return to connection pool
                if (!err) {
                    res.send(rows)
                }
                else {
                    console.log(err)
                }
            })
        })
    }
    catch (error) {
        console.error(error);
        res.render("400");
    }
}

const getEmployeesDetailById = async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log(`connected as id ${connection.threadId}`)
            //`SELECT * from employes WHERE id = ${req.params.id} `
            connection.query('SELECT * from employes WHERE id = ?', [req.params.id], (err, rows) => {
                connection.release() // return to connection pool
                if (!err) {
                    res.send(rows)
                }
                else {
                    console.log(err)
                }
            })
        })
    }
    catch (error) {
        console.error(error);
        res.render("400");
    }
}

const deleteEmployeesDetail = async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log(`connected as id ${connection.threadId}`)

            connection.query('DELETE  from employes WHERE id = ?', [req.params.id], (err, rows) => {
                connection.release() // return to connection pool
                if (!err) {
                    res.send(`employee with the Record ID : ${[req.params.id]} has been deleted`)
                }
                else {
                    console.log(err)
                }
            })
        })
    }
    catch (error) {
        console.error(error);
        res.render("400");
    }
}

const updateEmployeeDetails = async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) throw err
            console.log(`connected as id ${connection.threadId}`)
            //const params = req.body
            const {id, name, department,description,image}= req.body
            connection.query('UPDATE employes SET name = ? WHERE id = ?', [name,id], (err, rows) => {
                connection.release() // return to connection pool
                if (!err) {
                    res.send(`employee with the Record id : ${id} has been updated`)
                }
                else {
                    console.log(err)
                }
            })
        })
    }
    catch (error) {
        console.error(error);
        res.render("400");
    }
}

module.exports = {
    createEmployee,
    getEmployeesDetails,
    getEmployeesDetailById,
    deleteEmployeesDetail,
    updateEmployeeDetails
}
