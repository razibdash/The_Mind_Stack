// controllers/dashboardController.js
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentEnrollCourse");

const getDashboardStats = async (req, res) => {
  try {
    // Count total courses
    const totalCourses = await Course.countDocuments();

    // Count unique students who purchased at least one course
    const totalStudents = await StudentCourses.countDocuments({
      "courses.0": { $exists: true },
    });

    // Count total purchases (sum of all enrolled courses by all students)
    const totalPurchasesAgg = await StudentCourses.aggregate([
      { $unwind: "$courses" },
      { $count: "totalPurchases" },
    ]);

    const totalPurchases =
      totalPurchasesAgg.length > 0 ? totalPurchasesAgg[0].totalPurchases : 0;

    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalStudents,
        totalPurchases,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = { getDashboardStats };
