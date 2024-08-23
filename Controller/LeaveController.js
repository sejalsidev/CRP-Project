const mongoose = require('mongoose')
const { leaveDetail } = require('../Validations/LeaveValidation')
const leave = require('../Module/LeaveModel')
const employee = require('../Module/EmployeeModel')

const leavePost = async (req, res) => {
    const leaveDetail = req.body
    try {
        if (!leaveDetail) {
            res.json({ status: 404, message: "leave page not found" })
        }
        if (leaveDetail) {
            const { employee, leaveType, startDate, endDate, reason, status } = leaveDetail
            const leaveData = await leave.create({
                employee,
                leaveType,
                startDate,
                endDate,
                reason,
                status,
            })
            res.json({ status: 200, message: "add leave successfully", data: leaveData })
        }
        else {
            res.json({ status: 400, message: "not leave add" })
        }

    } catch (error) {
        console.log("Internal Server Error", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }

}
const leaveUpdate = async (req, res) => {
    const leaveDetail = req.body
    const { id } = req.params
    try {
        if (!leaveDetail) {
            res.json({ status: 404, message: "leave page not found" })
        }
        if (leaveDetail) {
            const { employee, leaveType, startDate, endDate, reason, status } = leaveDetail
            const leaveData = await leave.findByIdAndUpdate({ _id: id }, {
                employee: new mongoose.Types.ObjectId(employee),
                leaveType: leaveType,
                startDate: startDate,
                endDate: endDate,
                reason: reason,
                status: status,

            }, { new: true })
            res.json({ status: 200, message: "Update leave successfully", data: leaveData })
        }
        else {
            res.json({ status: 400, message: "not leave update" })
        }

    } catch (error) {
        console.log("Internal Server Error", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }

}
const leaveDelete = async (req, res) => {
    const { id } = req.params
    try {
        const leaveData = await leave.findByIdAndDelete({ _id: id })
        res.json({ status: 200, message: "delete leave record succesfully", data: leaveData })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }
}
const getLeave = async (req, res) => {
    try {
        const leaveData = await leave.find().populate('employee')
        res.json({ status: 200, message: "get leave record successfully", data: leaveData })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }
}
module.exports = { leavePost, leaveUpdate, leaveDelete, getLeave }
