import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const StudentBoughtCoursesPage = () => {
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  console.log("Auth in student courses page:", auth.user);
  const navigate = useNavigate();
  const fetchStudentBoughtCourses = async () => {
    try {
      if (auth && auth.user) {
        const studentId = auth.user._id;
        const response = await fetchStudentBoughtCoursesService(studentId);
        if (response?.success) {
          console.log("Bought courses:", response.data[0].courses);
          setStudentBoughtCoursesList(response.data[0].courses);
        }
      }
    } catch (error) {
      console.error("Error fetching student bought courses:", error);
    }
  };
  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);

  return (
    <div className=" bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="min-h-screen max-w-7xl mx-auto py-10 px-6">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold mb-10 text-white"
        >
          🎓 My Courses
        </motion.h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
            studentBoughtCoursesList.map((course, index) => (
              <motion.div
                key={course.courseId || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="flex flex-col rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Course Image */}
                  <CardContent className="p-0 flex-grow">
                    <img
                      src={course?.courseImage}
                      alt={course?.title}
                      className="h-52 w-full object-cover rounded-t-2xl"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {course?.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        👨‍🏫 {course?.instructorName}
                      </p>
                    </div>
                  </CardContent>

                  {/* Footer with button */}
                  <CardFooter className="p-4 border-t bg-gray-50">
                    <Button
                      onClick={() =>
                        navigate(`/course-progress/${course?.courseId}`)
                      }
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition"
                    >
                      <Watch className="mr-2 h-4 w-4" />
                      Start Watching
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-2xl font-bold text-gray-500"
            >
              🚫 No Courses Found
            </motion.h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentBoughtCoursesPage;
