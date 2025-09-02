const express = require("express");
const { getCurrentCourseProgress, markCurrentLectureAsViewed, resetCurrentCourseProgress } = require("../../controllers/student-controllers/courseProgressController");

const router = express.Router();

router.get("/get-progress/:userId/:courseId", getCurrentCourseProgress);
router.post("/mark-lecture-viewed", markCurrentLectureAsViewed);
router.post("/reset-progress", resetCurrentCourseProgress);

module.exports = router;