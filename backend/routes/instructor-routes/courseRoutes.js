const express = require("express");
const { addNewCourse, getAllCourses, getCourseDetailsByID, updateCourseByID, getCountCourses, deleteCourseById } = require("../../controllers/instructor/courseController");

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put("/update/:id", updateCourseByID);
router.get('/get-count-courses',getCountCourses)
router.delete('/delete/:id',deleteCourseById)

module.exports = router;