const captainModel = require("../models/captain.model")
const {validationResult} = require('express-validator')
const captainService = require('../services/captain.service')
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.registerCaptain = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
        return res.status(400).json({ message : "Captain already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    return res.status(201).json({ token, captain });

}

module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({ token, captain })
}

module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {

    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({ token });

    return res.status(200).json({message: "Logged Out"})

}