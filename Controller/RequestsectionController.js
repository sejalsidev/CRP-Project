const { requestsection } = require('../Module/RequestsectionModel')
const requestSection = require('../Validations/RequestValidation')
const User = require('../Module/registerModule')

const addRequestsection = async (req, res) => {
    const requestSection = req.body
    try {
        if (!requestSection) {
            res.json({ status: 404, message: "Request Section Not Found" })
        }
        if (requestSection) {
            const { title, description, priority, status, dateCreated, dateUpdated } = requestSection
            const requestData = await requestsection.create({
                title,
                description,
                priority,
                status,
                dateCreated,
                dateUpdated
            })
            res.json({ status: 400, message: "request section add successfully", data: requestData })
        }
    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "Internal server Error" })
    }
}
const updateRequestsection = async (req, res) => {
    const requestSection = req.body
    try {
        if (!requestSection) {
            res.json({ status: 404, message: "Request Section Not Found" })
        }
        if (requestSection) {
            const { title, description, priority, status, dateCreated, dateUpdated } = requestSection
            const { id } = req.params
            const requestData = await requestsection.findByIdAndUpdate({ _id: id }, {
                title: title,
                description: description,
                priority: priority,
                status: status,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated
            }, { new: true })
            res.json({ status: 200, message: "request section updated successfully", data: requestData })
        }
    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, message: "Internal server Error" })
    }
}
const deleteRequestsection = async (req, res) => {
    const { id } = req.params
    try {
        const requestData = await requestsection.findByIdAndDelete({ _id: id })
        res.json({ status: 200, message: "delete request section successfully", data: requestData })
    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, message: "Internal server Error" })
    }
}

const getRequestsection = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await User.findById(userId);
        console.log(userData, "<-user data->");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const requestData = await requestsection.find()
        res.json({ status: 200, message: "get request section successfully", data: requestData })
    } catch (error) {
        console.log("Error Fetching Data", error)
        res.json({ status: 500, message: "Internal server Error" })
    }
}
module.exports = { addRequestsection, updateRequestsection, deleteRequestsection, getRequestsection }