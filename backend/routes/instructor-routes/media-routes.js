const express = require("express");
const multer = require("multer");
const { mediaUploadController, mediaDeleteController, bulkUploadController } = require("../../controllers/instructor/mediaUploadController");
const authMiddleware = require("../../middleware/auth-middleware");


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.single("file"), mediaUploadController);

router.delete("/delete/:id", authMiddleware, mediaDeleteController);

router.post("/bulk-upload", authMiddleware, upload.array("files", 10), bulkUploadController);

module.exports = router;
