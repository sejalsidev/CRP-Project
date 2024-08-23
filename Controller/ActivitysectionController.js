const { activity } = require('../Module/ActivitysectionModel')
const { activitySection } = require('../Validations/ActivityValidation')
const User = require('../Module/registerModule')

const addActivitysection = async (req, res) => {
    const activitySection = req.body
    try {
        if (!activitySection) {
            res.json({ status: 404, message: "Activity Section Not Found" })
        }
        if (activitySection) {
            const { activityType, activityDesc, activityDate, title } = activitySection

            const activityData = await activity.create({
                activityType: activityType,
                activityDesc: activityDesc,
                activityDate: activityDate,
                title: title
            })
            res.json({ status: 200, message: "activity section add successfully", data: activityData })
        }
    } catch (error) {
        res.json({ status: 500, message: "Internal server Error" })
        console.log("Error Fetching Error", error)
    }
}
const updateActivitySection = async (req, res) => {
    const activitySection = req.body
    const { id } = req.params

    console.log(id, "fdfgfd")
    try {
        if (!activitySection) {
            res.json({ status: 404, message: "Activity Section Not Found" })
        }
        if (activitySection) {
            const { activityType, activityDesc, activityDate, title } = activitySection

            const activityData = await activity.findByIdAndUpdate({ _id: id }, {
                activityType: activityType,
                activityDesc: activityDesc,
                activityDate: activityDate,
                title: title
            }, { new: true })
            res.json({ status: 200, message: "activity section update successfully", data: activityData })
        }
    } catch (error) {
        res.json({ status: 500, message: "Internal server Error" })
        console.log("Error Fetching Error", error)
    }
}
const deleteActivitysection = async (req, res) => {
    const { id } = req.params
    try {
        const activityData = await activity.findByIdAndDelete({ _id: id })
        return res.json({ status: 200, message: "activity section delete successfully", data: activityData })
    } catch (error) {
        res.json({ status: 500, message: "Internal server Error" })
        console.log("Error Fetching Error", error)
    }
}

const getActivitysection = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await User.findById(userId);
        console.log(userData, "<-user data->");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const activityData = await activity.find();
        return res.status(200).json({ message: "Activity section retrieved", data: activityData });

    } catch (error) {
        console.error("Error fetching activity section", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addActivitysection, updateActivitySection, deleteActivitysection, getActivitysection }