const express = require("express");
const authMiddleware = require("../../middleware/auth-middleware");
const { textGenController } = require("../../controllers/Ai/text-gen-controller");
const { imageGen } = require("../../controllers/Ai/img-gen-controller");

const router = express.Router();


router.post("/generate-course-description",authMiddleware,textGenController);
router.post("/generate-image",authMiddleware,imageGen);


module.exports = router;