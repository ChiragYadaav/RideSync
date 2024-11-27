const userModel = require('../models/user.model');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
        return res.status(401).json({message : "Unauthorized"})
    }

    const isBlackListed = await userModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({message : "Unauthorized"})
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;

        return next();
        
    } catch {
        return res.status(401).json({message : "Unauthorized"})
    }
}