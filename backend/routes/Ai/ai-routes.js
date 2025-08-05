const express = require("express");
const authMiddleware = require("../../middleware/auth-middleware");
const { textGenController } = require("../../controllers/Ai/text-gen-controller");

const router = express.Router();


router.post("/generate-course-description",authMiddleware,textGenController);


module.exports = router;