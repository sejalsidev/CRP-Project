const mongoose = require('mongoose')
const Employee = require("../Module/EmployeeModel");
const { attendanceValidation } = require('../Validations/attendanceValidation')
const { attendance } = require('../Module/AttendanceModel')

const addAttendance = async (req, res) => {
    const attendanceValidation = req.body
    try {
        if (!attendanceValidation) {
            res.json({ status: 404, message: "attendance is not found" })
        }

        if (attendanceValidation) {
            const { employee, date, clockIn, clockOut, status, notes } = attendanceValidation
            const attendanceData = await attendance.create({
                employee: new mongoose.Types.ObjectId(employee),
                date,
                clockIn,
                clockOut,
                status,
                notes
            })
            res.json({ status: 200, message: "add attendance successfully", data: attendanceData })
        }
        else {
            res.json({ status: 400, message: "not add attendance" })
        }

    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, messsage: "Internal Server Error" })
    }
}
const updateAttendance = async (req, res) => {
    const attendanceValidation = req.body
    const { id } = req.params
    try {
        if (!attendanceValidation) {
            res.json({ status: 404, message: "attendance is not found" })
        }
        if (attendanceValidation) {
            const { employee, date, clockIn, clockOut, status, notes } = attendanceValidation
            const attendanceData = await attendance.findByIdAndUpdate({ _id: id }, {
                employee: new mongoose.Types.ObjectId(employee),
                date: date,
                clockIn: clockIn,
                clockOut: clockOut,
                status: status,
                notes: notes
            })
            res.json({ status: 200, message: "attendance updated successfully", data: attendanceData })
        }
        else {
            res.json({ status: 400, message: "not update attendance" })
        }

    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, messsage: "Internal Server Error" })
    }
}
const deleteAttendance = async (req, res) => {
    const { id } = req.params
    try {
        const attendanceData = await attendance.findByIdAndDelete({ _id: id })
        res.json({ status: 200, message: "attendance deleted successfully", data: attendanceData })
    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, messsage: "Internal Server Error" })
    }
}
const getAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;


        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }


        const attendanceRecords = await attendance.find({ employee: employeeId })

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found for this employee' });
        }

        // Standard check-in and check-out times in hours
        const standardCheckInTime = 9; // 9:00 AM
        const standardCheckOutTime = 18; // 6:00 PM

        // Process attendance records to calculate status
        const processedRecords = attendanceRecords.map(record => {
            let status = 'absent'; // Default status

            if (record.clockIn && record.clockOut) {
                const clockInTime = new Date(record.clockIn);
                const clockOutTime = new Date(record.clockOut);

                const clockInHours = clockInTime.getHours();
                const clockInMinutes = clockInTime.getMinutes();
                const clockOutHours = clockOutTime.getHours();
                const clockOutMinutes = clockOutTime.getMinutes();

                // Check if the employee is exactly on time for both check-in and check-out
                if (clockInHours === standardCheckInTime && clockInMinutes === 0 && clockOutHours === standardCheckOutTime && clockOutMinutes === 0) {
                    status = 'present';
                }
                // Check if the employee is late
                else if (clockInHours > standardCheckInTime || (clockInHours === standardCheckInTime && clockInMinutes > 0)) {
                    status = 'late';
                }
            }

            return {
                ...record._doc,
                status,
            };
        });

        res.status(200).json(processedRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}
module.exports = { addAttendance, updateAttendance, deleteAttendance, getAttendance }