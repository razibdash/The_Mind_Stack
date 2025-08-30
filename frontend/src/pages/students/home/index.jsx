import React, { useContext, useEffect } from "react";
import { courseCategories } from "@/config";
import { Link } from "react-router-dom";
import { Home, BookOpen, Settings, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StudentContext } from "@/context/student-context";
import { fetchStudentsViewCourseListService } from "@/services";
const StudentHomePage = () => {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);

  const fetchStudentViewCourses = async () => {
    try {
      console.log("Fetching student view courses...");
      const response = await fetchStudentsViewCourseListService();
      console.log("Fetched student view courses:", response);
      if (response?.success) {
        setStudentViewCoursesList(response.data);
      }
    } catch (error) {
      console.error("Error fetching student view courses:", error);
    }
    // Call the service to fetch student view courses
  };

  useEffect(() => {
    fetchStudentViewCourses();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 ">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-12 px-6 lg:px-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2 lg:pr-12 text-center lg:text-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Learning that{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              gets you ahead
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Skills for your present and your future. <br />
            Take the first step with us today 🚀
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 
              text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img
            src="/banner-img.png"
            alt="Learning Banner"
            className="w-full  h-auto rounded-2xl shadow-2xl border border-gray-700/40"
          />
        </motion.div>
      </section>
      <section className="py-12 px-6 lg:px-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        {/* Heading */}
        <motion.h2
          className="text-3xl lg:text-4xl font-extrabold mb-8 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Explore{" "}
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Course Categories
          </span>
        </motion.h2>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {courseCategories.map((categoryItem) => (
            <motion.div
              key={categoryItem.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Button
                className="w-full justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 
                  text-gray-200 font-semibold border border-gray-600 shadow-md
                  hover:from-blue-500 hover:to-teal-400 hover:text-white hover:shadow-xl 
                  transition-all duration-300"
                variant="outline"
              >
                {categoryItem.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className="relative py-16 px-6 lg:px-16 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient z-0"></div>

        <div className="relative z-10">
          {/* Section Title */}
          <motion.h2
            className="text-3xl lg:text-4xl font-extrabold mb-10 "
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Featured
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Courses
            </span>
          </motion.h2>

          {/* Courses Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseItem) => (
                <motion.div
                  key={courseItem?._id}
                  className="group bg-gray-900/80 border border-gray-700 rounded-2xl overflow-hidden shadow-lg 
                hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer backdrop-blur-md"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Course Image */}
                  <div className="relative">
                    <img
                      src={courseItem?.image}
                      alt={courseItem?.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                      {courseItem?.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      By {courseItem?.instructorName}
                    </p>
                    <p className="font-semibold text-xl bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                      ${courseItem?.pricing}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.h1
                className="text-center text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No Courses Found
              </motion.h1>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StudentHomePage;
