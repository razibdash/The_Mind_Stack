const express = require("express");
const { registerUser, loginUser } = require("../../controllers/auth-controllers/index.js");
const authMiddleware = require("../../middleware/auth-middleware/index.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/check-auth", authMiddleware, async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "User is authenticated", user: req.user });
    } catch (error) {
        console.error("Error checking auth:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
