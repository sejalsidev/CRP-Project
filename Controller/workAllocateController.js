const mongoose = require('mongoose')
const { validateWorkAllocate } = require('../Validations/workallocateValidation')
const { workAllocateModel } = require('../Module/WorkallocateModel')
const employee = require('../Module/EmployeeModel')
const User = require('../Module/registerModule');

const addWorkAllocate = async (req, res) => {
    const validateWorkAllocate = req.body
    console.log(validateWorkAllocate, "workallocateworkallocateworkallocateworlallocate")

    try {
        if (!validateWorkAllocate) {
            res.json({ status: 404, message: "workallocate not found" })
        }

        if (validateWorkAllocate) {
            const { employeeId, companyName, jobTitle, startDate, endDate, status, assignTask } = validateWorkAllocate

            // console.log("req.user ===", req.user);
            // const userid = req.user.id


            // const { employeeId } = req.user;
            // console.log(employeeId, "employeeIdemployeeIdemployeeIdemployeeId")

            console.log(validateWorkAllocate, "workallocateworkallocateworkallocateworkallocateworkallocate")
            // const employeeData = await employee.findOne({ name: employeeName })

            let workallocateDetail = await workAllocateModel.create({
                employeeId: employeeId,
                companyName: companyName,
                jobTitle: jobTitle,
                startDate: startDate,
                endDate: endDate,
                status: status,
                assignTask: assignTask
            })
            res.json({ status: 200, message: "Add Work allocate successfully", "data": workallocateDetail })
        }
        else {
            res.json({ status: 400, message: "Not Add Work allocate" })
        }

    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "Internal Server Error" })
    }
}

const getWorkAllocate = async (req, res) => {
    const userId = req.user.id
    console.log(userId, "employeeIdemployeeIdemployeeIdemployeeId")
    try {
        //  aa logic ma thodu bakki chhe te find karo ane issue solve karo ...
        const userData = await User.findById(userId);
        console.log(userData, "<-user data->")
        if (!userData) {
            res.json({ status: 404, message: "user Not found" })
        }
        if (userData.userType === 'Admin') {
            // -----------when user has usertype === admin 
            const workData = await workAllocateModel.find();
            console.log(workData, "workDataworkDataworkDataworkDataworkData")
            res.json({ status: 200, message: "get data successfully", data: workData });
        }
        else {
            // -----------when user has usertype === user 
            const workData = await workAllocateModel.find({ employeeId: userId })
            console.log(workData, "workDataworkDataworkDataworkDataworkData")
            res.json({ status: 200, message: "get data successfully", data: workData })
        }
    } catch (error) {
        console.log("Error Fetching data", error)
    }
}
const updateWorkAllocate = async (req, res) => {
    const validateWorkAllocate = req.body
    const userId = req.user.id;
    console.log(userId, "userID");

    try {
        // Fetch the user data
        const userData = await User.findById(userId);
        console.log(userData, "<-user data->");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check user type
        if (userData.userType === 'Admin') {
            const { companyName, jobTitle, startDate, endDate, status, assignTask } = validateWorkAllocate
            const { id } = req.params

            // When user has userType 'Admin'
            const workData = await workAllocateModel.findByIdAndUpdate({ _id: id }, {
                companyName: companyName,
                jobTitle: jobTitle,
                startDate: startDate,
                endDate: endDate,
                status: status,
                assignTask: assignTask
            }, { new: true });
            console.log(workData, "workData");

            return res.status(200).json({ message: "Data update successfully", data: workData });
        } else {
            return res.status(403).json({ message: "User is not an admin" });
        }
    } catch (error) {
        console.log("Error fetching data", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const deleteworkAllocate = async (req, res) => {
    const { id } = req.params
    try {
        const workhistoryData = await workAllocateModel.findByIdAndDelete({ _id: id })
        res.json({ status: 200, message: "delete workallocate successfully", data: workhistoryData })
    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "Internal server error" })
    }
}

const getEmployeeName = async (req, res) => {
    const userId = req.user.id
    console.log(userId, "userIduserIduserIduserIduserIduserIduserIduserId")
    try {
        const employeeData = await User.find({ userType: 'Users' })
        console.log(employeeData, "employeeDataemployeeDataemployeeData")
        res.json({ status: 200, message: "successs", employeeData })
    } catch (error) {
        console.log("Error fetching data", error)
        res.json({ status: 500, message: "Internal server error" })
    }

}



// -----------------------------------------------------work history---------------------------------------------------------------------------
const getWorkHistory = async (req, res) => {
    try {
        const workHistory = await workAllocateModel.find()
        console.log("work history data", workHistory)
        res.json({ status: 200, message: "success", data: workHistory })
    } catch (error) {
        console.log("Error Fetching Data", error)
    }
}


module.exports = { addWorkAllocate, getWorkAllocate, updateWorkAllocate, deleteworkAllocate, getEmployeeName, getWorkHistory }