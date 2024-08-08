const userModel = require('../Module/registerModule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser');

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const registerData = await userModel.findOne({ email })
        if (!registerData) {
            if (userName && email && password) {
                const decrpPwd = await bcrypt.hash(password, 10)
                let userDetail = await userModel.create({
                    userName: userName,
                    email: email,
                    password: decrpPwd
                })
                res.json({ status: 200, message: "success", userDetail })
            }
            else {
                res.json({ status: 400, message: "all fields are required" })
            }
        }
        else {
            res.json({ status: 400, message: "Not Data" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: 500, message: "internal server error" })

    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const loginData = await userModel.findOne({ email })
    console.log(loginData, "userDatauserDatauserDatauserData")
    try {
        if (email && password) {
            if (loginData) {
        
                const token = jwt.sign({ id: loginData._id, email: loginData.email }, 'your_secret_key', { expiresIn: '30d' });
                res.cookie('x-access-token', token, { secure: false, httpOnly: true });
                console.log(token, "tokentokentokentoken")
                return res.json({
                    status: 200,
                    message: 'login successfully',
                    token
                })
            } else {
                return res.json({
                    status: 400,
                    message: "invalid email and password"
                })
            }
        }
        else {
            return res.json({
                status: 401,
                message: "all field are required"
            })
        }
    } catch (error) {
        console.log(error.message, "errorerrorerrorerrorerror")
        return res.json({
            status: 500,
            message: 'internal server error '
        })
    }

}
module.exports = {
    register,
    login
}