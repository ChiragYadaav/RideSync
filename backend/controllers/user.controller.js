const blacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model")
const userService = require('../services/user.service')
const { validationResult, cookie } = require("express-validator");


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, password, email } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message : "User already exists" });
    }
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    return res.status(201).json({ token, user });

};

module.exports.loginUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({ token, user })

}; 

module.exports.getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie('token');
    await blacklistTokenModel.create({ token });

    return res.status(200).json({message: "Logged Out"})

}