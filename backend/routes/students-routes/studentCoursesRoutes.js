const express=require('express');
const { getCoursesByStudentId } = require('../../controllers/student-controllers/studentCouresesController');

const router=express.Router();

router.get('/get/:studentId',getCoursesByStudentId);

module.exports=router;