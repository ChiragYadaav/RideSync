const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model')
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    // console.log(req.headers.authorization);

    if (!token) {
        return res.status(401).json({message : "Unauthorized: Token not found"})
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({message : "Unauthorized: Blacklisted Token"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
        
    } catch(error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({message : "Unauthorized: Verification Failed"})
    }
}

module.exports.authCaptain = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({message : "Unauthorized"})
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({message : "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
        
    } catch {
        return res.status(401).json({message : "Unauthorized"})
    }
}