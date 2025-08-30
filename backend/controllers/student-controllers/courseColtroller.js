const Course = require("../../models/Course");

const getAllStudentViewCourses = async (req, res) => {
  try {
     const courseList= await Course.find();
     if(!courseList || courseList.length === 0){
       return res.status(404).json({ message: "No courses found", success: false,data: [] });
     }
     res.status(200).json({ message: "Courses fetched successfully", success: true, data: courseList });
  } catch (error) {
    console.error("Error fetching student view courses:", error);
    res.status(500).json({ message: "Internal server error", success: false});
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  try {
    const {id} =req.params;
    const courseDetails = await Course.findById(id).populate('instructor', 'name email');
    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found", success: false, data: null });
    }
    res.status(200).json({ message: "Course fetched successfully", success: true, data: courseDetails });
  } catch (error) {
    console.error("Error fetching student view course details:", error);
    res.status(500).json({ message: "Internal server error", success: false, data: null });
  }
};

module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
};
