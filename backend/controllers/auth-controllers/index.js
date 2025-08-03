const bcrypt = require("bcrypt");
const User = require("../../models/User");

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


module.exports = {
    registerUser,
}