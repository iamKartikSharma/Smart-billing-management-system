const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.auth = async (req, res, next) => {
    try {
        console.log(req.body.token, "Token");
        console.log(req.headers, "Headers");
        console.log(req.headers['authorization'], "Authorization");
        const token = req.body.token || req.headers['authorization'].replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: 'Access Denied'
            });
        }

        const user = jwt.verify(token, JWT_SECRET);
        console.log(user, "User");

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Token'
            });
        }

        req.user = user; 

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};