const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
// Controller function to register a new user
const registerUser = async (req,res) => {
  
    try {
        const { userName, userEmail, password, role } = req.body;

        // Validate input
        if (!userName || !userEmail || !password) {
        return res.status(400).json({ message: "All fields are required" });
        }
    // Check if user already exists using email or username
    const existingUser = await User.findOne({$or: [{userEmail}, {userName}],});
    if (existingUser) {
    return res.status(400).json({ 
        success: false,
        message: "User already exists" });
    }

    // Create new user use bcrypt to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, userEmail, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ 
        success: true, message: "User registered successfully",
        user: {
            id: newUser._id,
            userName: newUser.userName,
            userEmail: newUser.userEmail,
            role: newUser.role
        }
    });
} catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
}
};

//login user
const loginUser = async (req, res) => {
    const { userEmail, password } = req.body;

    try {
        // Validate input   
        if (!userEmail || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Find user by email
        const user = await User.findOne({ userEmail });
        if (!user) {    
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }   
        // Return user data without password generated JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                userName: user.userName,
                userEmail: user.userEmail,
                role: user.role
            },
            accessToken: token
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
}