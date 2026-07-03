const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {
        console.log("Body:", req.body);

        const { fullName, email, password, role } = req.body;

        console.log("Checking existing user...");
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating user...");
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
        });

        console.log("Generating token...");
        const token = generateToken(user._id);

        console.log("Sending response...");
        res.status(201).json({
            success: true,
            message: "Registration Successful",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    });
};

module.exports = {
    registerUser,
     loginUser,
};