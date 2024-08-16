const jwt = require('jsonwebtoken');
const userModel = require('../Module/registerModule');

const auth = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization || req.body.token || req.query.token || req.cookies['x-access-token'] || req.headers['x-access-token'];
        console.log("Token from request:", tokenHeader);

        if (!tokenHeader) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user: No token provided"
            });
        }

        const token = tokenHeader.startsWith('Bearer') ? tokenHeader.split(' ')[1] : tokenHeader;
        console.log("Extracted token:", token);

        const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
        console.log(decoded, "decoded")
        if (!decoded) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user: Invalid token"
            });
        }

        const userData = await userModel.findOne({ _id: decoded.id });
        console.log("User data:", userData);

        if (!userData) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user: User not found or token mismatch"
            });
        }

        req.user = { id: userData._id };
        req.token = token;

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({
            status: 401,
            message: "Unauthorized user: Token verification failed"
        });
    }
};

module.exports = auth;
