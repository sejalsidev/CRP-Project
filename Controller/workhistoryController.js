const mongoose = require('mongoose')
const { validateWorkHistory } = require('../Validations/workhistoryValidation')
const { workHistoryModel } = require('../Module/WorkhistoryModel')
const employee = require('../Module/EmployeeModel')


const addWorkhistory = async (req, res) => {
    const validateWorkHistory = req.body
    console.log(validateWorkHistory, "workHistroyworkHistroyworkHistroy")

    try {
        if (!validateWorkHistory) {
            res.json({ status: 404, message: "workhistory not found" })
        }

        if (validateWorkHistory) {
            const { employee, companyName, jobTitle, startDate, endDate, status, assignTask } = validateWorkHistory
            console.log("req.user ===",req.user);
           
            // const { employeeId } = req.user;
            // console.log(employeeId, "employeeIdemployeeIdemployeeIdemployeeId")
            console.log(validateWorkHistory, "workHistroyworkHistroyworkHistroy")
            // const employeeData = await employee.findOne({ name: employeeName })
            let workhistoryDetail = await workHistoryModel.create({
                employee: employeeId,
                companyName: companyName,
                jobTitle: jobTitle,
                startDate: startDate,
                endDate: endDate,
                status: status,
                assignTask: assignTask
            })
            res.json({ status: 200, message: "Add Work History successfully", "data": workhistoryDetail })
        }
        else {
            res.json({ status: 400, message: "Not Add Work History" })
        }

    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }
}

const getWorkHistory = async (req, res) => {
    const { employeeId } = req.params
    console.log(employeeId, "employeeIdemployeeIdemployeeIdemployeeId")
    try {
        const workData = await workHistoryModel.find({ _id: employeeId }).populate('employee')
        console.log(workData, "workDataworkDataworkDataworkDataworkData")
        res.json({ status: 200, message: "get data successfully", data: workData })
        return workData
    } catch (error) {
        console.log("Error Fetching data", error)
    }
}
const updateworkHistory = async (req, res) => {
    const validateWorkHistory = req.body
    const { id } = req.params
    try {
        if (!validateWorkHistory) {
            res.json({ status: 404, message: "workhistory not found" })
        }

        if (validateWorkHistory) {
            const { companyName, jobTitle, startDate, endDate, status, assignTask } = validateWorkHistory
            console.log(validateWorkHistory, "workHistroyworkHistroyworkHistroy")

            let workhistoryDetail = await workHistoryModel.findByIdAndUpdate({ _id: id }, {
                companyName: companyName,
                jobTitle: jobTitle,
                startDate: startDate,
                endDate: endDate,
                status: status,
                assignTask: assignTask
            }, { new: true })
            res.json({ status: 200, message: "update Work History successfully", "data": workhistoryDetail })
        }
        else {
            res.json({ status: 400, message: "Not update Work History" })
        }

    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }
}

const deleteworkhistory = async (req, res) => {
    const { id } = req.params
    try {
        const workhistoryData = await workHistoryModel.findByIdAndDelete({ _id: id })
        res.json({ status: 200, message: "delete workhistory successfully", data: workhistoryData })
    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "internal server error" })
    }
}

module.exports = { addWorkhistory, getWorkHistory, updateworkHistory, deleteworkhistory }