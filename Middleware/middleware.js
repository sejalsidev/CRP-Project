const jwt = require('jsonwebtoken')
const userModel = require('../Module/registerModule')

const cookieParser = require("cookie-parser");

const auth = async (req, res, next) => {
    try {
        let validToken = req.headers.authorization || req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        console.log(validToken, "totkejwefjhehrfgjher")

        // console.log(req.cookies.token);
        // console.log(validToken, "tokentokentokentoken")

        let token = validToken.split(" ")[1];
        if (token) {
            console.log(token, "tokenswww")
            let user = jwt.verify(token, 'your_secret_key')
            console.log(user, "useruseruseruser")
            const userData = await userModel.findById({ _id: user.id, 'tokens.token': token })
            console.log("user data  = ", userData);

            // const token = jwt.sign({ id: loginData._id, email: loginData.email }, 'your_secret_key', { expiresIn: '30d' });
            if (userData) {
                console.log(user)
                req.user = { id: user.id, employeeId: userData.empId };
                req.token = token
                next()
            }
            else {
                res.json({
                    status: 401,
                    message: "unathorized user"
                })
            }
        }
        else {
            console.log("ggggg")

            res.json({
                status: 401,
                message: "unathorized user"
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            status: 401,
            message: "unathorized user"
        })
    }
}
module.exports = auth