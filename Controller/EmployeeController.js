const mongoose = require("mongoose");
const employee = require("../Module/EmployeeModel");
const EmployeeExtra = require('../Module/employeExtra.model');
const { employeeData } = require("../Validations/EmployeeValidation");


const addEmployeDetail = async (req, res) => {
    const employeeData = req.body;
    console.log(employeeData, "<------------------------employee data ----------------------->");

    const image = req.file.path
    console.log(image, "+ixjkascfhjsdfhefvh++")
    try {

        const newEmployee = await employee.create(employeeData);
        console.log(newEmployee, "---------------------------------------------------------------------")

        const newEmployeeExtra = await EmployeeExtra.create({
            empId: newEmployee?._id,
            ...employeeData,
            image
        });

        console.log(newEmployeeExtra, "newEmployeeExtranewEmployeeExtranewEmployeeExtranewEmployeeExtranewEmployeeExtra")
        return res.json({ status: 200, message: "success", newEmployee, newEmployeeExtra });
    } catch (error) {
        console.error("Error creating employee or employeeExtra", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }


}

const updateEmployee = async (req, res) => {
    const employeeData = req.body;
    console.log(employeeData);

    const employeeId = req.params.id;
    console.log(employeeId, 'esdfsedwedwedwqedwqedwqedwqed');

    // Check if file is uploaded and add the image path to employeeData
    if (req.file) {
        employeeData.image = req.file.path;
    }

    try {
        const updatedEmployee = await employee.findByIdAndUpdate(
            { _id: employeeId },
            employeeData,
            { new: true }
        );
        console.log(updatedEmployee, "fsdgfdsfgdrrfgdfg");

        if (!updatedEmployee) {
            console.log("Employee not found");
            return res.status(404).json({ status: 404, message: "Employee not found" });
        }

        const updateEmployeeData = await EmployeeExtra.findOneAndUpdate(
            { empId: employeeId },
            { $set: employeeData },
            { new: true }
        );

        if (!updateEmployeeData) {
            console.log("EmployeeExtra not found");
            return res.status(404).json({ status: 404, message: "EmployeeExtra not found" });
        }

        res.json({ status: 200, message: "success", updatedEmployee, updateEmployeeData });
    } catch (error) {
        console.log("Error updating employee or employeeExtra", error);
        res.json({ status: 500, message: "Internal server error" });
    }
}


const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id
    console.log(employeeId, "gfgfrg")

    try {
        const Employee = await employee.findByIdAndDelete({ _id: employeeId })
        const EmployeeData = await EmployeeExtra.findOneAndDelete({ empId: employeeId })
        if (Employee && EmployeeData) {


            res.json({
                status: 200, message: "data deleted successfully", employeeId

            })
        }
        else {
            res.json({
                status: 200, message: "data is not found", employeeId

            })
        }
    } catch (error) {
        console.log("Error deleteing employee or employeeExtra", error)
        res.json({ status: 500, message: "Internal server error" })
    }
}


// const deleteEmployee = async (req, res) => {
//     try {
//         const { id } = req.params
//         const employeeData = await employee.findOne({ id })
//         console.log(employeeData, "employeeDataemployeeData")
//         return res.json({
//             status: 200,
//             message: 'success',
//             employeeData
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

const getEmployee = async (req, res) => {

    try {
        const EmployeeData = await EmployeeExtra.aggregate([

            {
                $lookup: {
                    from: 'employees', // Name of the collection you want to join
                    localField: 'empId', // Field in EmployeeExtra collection
                    foreignField: '_id', // Field in OtherCollection
                    as: 'EmployeeData' // Output array field
                }
            }
        ]);


        return res.status(200).json(EmployeeData)

    } catch (error) {
        console.log("Error get employee or employeeExtra", error)
        res.json({ status: 500, message: "Internal Sever Error" })
    }
}
module.exports = { addEmployeDetail, updateEmployee, deleteEmployee, getEmployee };
