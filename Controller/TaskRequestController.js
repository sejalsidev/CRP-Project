const mongoose = require('mongoose')
const { taskRequestValidate } = require('../Validations/TaskRequestValidation')
const { taskRequest } = require('../Module/TaskRequestModel')
const employee = require('../Module/EmployeeModel')

const addTaskRequest = async (req, res) => {
    const taskRequestValidate = req.body

    try {
        const { employeeName, task, description } = taskRequestValidate
        if (!taskRequestValidate) {
            res.json({ status: 404, message: "task request not found" })
        }
        const employeeData = await employee.findOne({ name: employeeName })
        console.log(employeeData, "employeeDataemployeeDataemployeeData")
        if (taskRequestValidate) {
            const taskDetails = await taskRequest.create({
                employee: new mongoose.Types.ObjectId(employeeData._id),
                task: new mongoose.Types.ObjectId(task._id),
                description
            })
            res.json({ status: 200, message: "task request add succesfully", data: taskDetails })
        } else {
            res.json({ status: 400, message: "not task request" })
        }
    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, message: "Internaql server error" })
    }
}
module.exports = { addTaskRequest }