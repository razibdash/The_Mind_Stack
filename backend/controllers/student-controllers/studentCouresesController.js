const StudentEnrollCourse=require("../../models/StudentEnrollCourse");

const getCoursesByStudentId=async (req,res)=>{
    const studentId=req.params.studentId;
    try {
        const studentBoughtCourses=await StudentEnrollCourse.find({userId:studentId})

        if(!studentBoughtCourses){
            return res.status(404).json({message:"No courses found for this student",success:false});
        }
        console.log("Student bought courses:", studentBoughtCourses);
        res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:studentBoughtCourses
        });
    } catch (error) {
        res.status(500).json({message:error.message,success:false});
    }
}


module.exports={
    getCoursesByStudentId
} 