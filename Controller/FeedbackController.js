const mongoose = require('mongoose');
const { feedbackModel } = require('../Module/FeedbackModel');
const { feedbackData } = require('../Validations/FeedbackValidation');
const register = require('../Module/registerModule');

const addFeedback = async (req, res) => {
    const feedbackData = req.body;

    try {
        if (!feedbackData) {
            res.json({ status: 404, message: "Feedback Data Not Found" })
        }
        if (feedbackData) {
            const { user, comments, rating, dateSubmitted } = feedbackData;
            console.log(dateSubmitted, "dateSubmitteddateSubmitteddateSubmitted")

            let feedbackDetails = await feedbackModel.create({
                // user: user._id,
                comments: comments,
                rating: rating,
                dateSubmitted: dateSubmitted
            });

            res.json({ status: 200, message: "Feedback successfully added", "data": feedbackDetails });
        } else {
            res.status(400).json({ status: 400, message: "No data provided" });
        }
    } catch (error) {
        console.error("Error Adding Feedback", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
};


const getFeedback = async (req, res) => {
    const { userId } = req.params
    try {
        let feedbackData = await feedbackModel.find({ user: userId }).populate('user');
        res.json({ status: 200, data: feedbackData })
        return feedbackData;
    } catch (error) {
        console.log(error)
    }

}

const updateFeedback = async (req, res) => {
    const feedbackData = req.body
    const { id } = req.params
    try {
        if (!feedbackData) {
            res.json({ status: 404, message: "Feedback Data Not Found" })
        }

        if (feedbackData) {
            const { user, comments, rating, dateSubmitted } = feedbackData

            let feedbackDetail = await feedbackModel.findByIdAndUpdate({ _id: id }, {
                comments: comments,
                rating: rating,
                dateSubmitted: dateSubmitted
            }, { new: true })
            res.json({ status: 200, message: "update successfully", "data": feedbackDetail })
        }
        else {
            res.json({ status: 400, message: "not update feedback" })
        }
    } catch (error) {
        console.log("Error Fetching Data", error)
    }
}

const deleteFeedback = async (req, res) => {
    const { id } = req.params

    try {
        const feedbackData = await feedbackModel.findByIdAndDelete({ _id: id })
        res.json({ status: 200, message: "delete feedback successfully", "data": feedbackData })
    } catch (error) {
        console.log("Error Fetching data", error)
        res.json({ status: 500, message: "Internal server error" })
    }
}
module.exports = { addFeedback, getFeedback, updateFeedback, deleteFeedback };

// =====================================================================register user get emailId===================================================================================


// const mongoose = require('mongoose');
// const { feedbackModel } = require('../Module/FeedbackModel');
// const { feedbackData } = require('../Validations/FeedbackValidation');
// const registerModel = require('../Module/registerModule');

// const addFeedback = async (req, res) => {
//     const feedbackData = req.body;

//     try {
//         if (feedbackData) {
//             const { userEmail, user, comments, rating, dateSubmitted } = feedbackData;
//              const userDoc = await registerModel.findOne({ email: userEmail });

//             if (!userDoc) {
//                  return res.status(404).json({ status: 404, message: "User not found" });
//              }

//             let feedbackDetails = await feedbackModel.create({
//                  user: userDoc._id,
//                 user: user,
//                 comments: comments,
//                 rating: rating,
//                 dateSubmitted: dateSubmitted
//             });

//             res.status(200).json({ status: 200, message: "Feedback successfully added", feedbackDetails });
//         } else {
//             res.status(400).json({ status: 400, message: "No data provided" });
//         }
//     } catch (error) {
//         console.error("Error Adding Feedback", error);
//         res.status(500).json({ status: 500, message: "Internal server error" });
//     }
// };

// const getFeedback = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         let feedbackData = await feedbackModel.find({ user: userId }).populate('user');
//         res.status(200).json({ status: 200, data: feedbackData });
//     } catch (error) {
//         console.error("Error Getting Feedback", error);
//         res.status(500).json({ status: 500, message: "Internal server error" });
//     }
// };

// module.exports = { addFeedback, getFeedback };
