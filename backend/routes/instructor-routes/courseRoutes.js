const express = require("express");
const { addNewCourse, getAllCourses, getCourseDetailsByID, updateCourseByID, getCountCourses } = require("../../controllers/instructor/courseController");

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put("/update/:id", updateCourseByID);
router.get('/get-count-courses',getCountCourses)

module.exports = router;