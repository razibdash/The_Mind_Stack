const express = require("express");
const multer = require("multer");
const { mediaUploadController, mediaDeleteController } = require("../../controllers/instructor/mediaUploadController");
const authMiddleware = require("../../middleware/auth-middleware");


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.single("file"), mediaUploadController);

router.delete("/delete/:id", authMiddleware, mediaDeleteController);

module.exports = router;
