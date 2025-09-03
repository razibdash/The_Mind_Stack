import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { sortOptions, filterOptions } from "@/config";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentsViewCourseListService,
} from "@/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

function createQueryParams(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

const StudentViewCourses = () => {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const { auth } = useContext(AuthContext);
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  async function fetchStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentsViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    } else {
      console.error("Failed to fetch student view courses:", response?.message);
    }
  }

  useEffect(() => {
    if (filters !== null && sort !== null) {
      fetchStudentViewCourses(filters, sort);
    }
  }, [filters, sort]);

  useEffect(() => {
    const buildFilteredQueryParams = createQueryParams(filters);
    setSearchParams(new URLSearchParams(buildFilteredQueryParams));
  }, [filters]);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );
    console.log(response, "check course parcheses ");
    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    } else {
      navigate(`/course/details/${getCurrentCourseId}`);
    }
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  // if (loadingState) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <motion.div
      className="min-h-screen relative  overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-gradient-x opacity-95"></div>

      <div className="container max-w-7xl  mx-auto relative z-10 p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-white tracking-wide">
          All Courses
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            className="w-full md:w-72 bg-gray-800/50 rounded-2xl p-6 shadow-xl backdrop-blur-md"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {Object.keys(filterOptions).map((keyItem) => (
              <div key={keyItem} className="mb-6 border-b border-gray-700 pb-4">
                <h3 className="font-bold mb-4 text-gray-200 text-lg">
                  {keyItem.toUpperCase()}
                </h3>
                <div className="grid gap-3 mt-2">
                  {filterOptions[keyItem].map((option) => {
                    const isChecked =
                      filters &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1;

                    return (
                      <motion.div
                        key={option.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={
                            isChecked
                              ? { scale: [0.7, 1.2, 1], rotate: [0, 15, 0] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() =>
                              handleFilterOnChange(keyItem, option)
                            }
                          />
                        </motion.div>
                        <Label className="font-medium text-gray-300 cursor-pointer">
                          {option.label}
                        </Label>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.aside>

          {/* Main Section */}
          <motion.main
            className="flex-1 bg-gray-900/40 rounded-2xl p-6 shadow-xl backdrop-blur-lg"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {/* Sort Button */}
            <div className="flex justify-end items-center mb-6 gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center bg-gray-800 gap-2 px-6 py-3 text-white border-gray-600 hover:bg-gray-800 hover:text-stone-200 transition-all"
                  >
                    <ArrowUpDownIcon className="h-5 w-5" />
                    <span className="text-[16px] font-medium">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[200px] bg-gray-800 text-white border border-gray-700"
                >
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => setSort(value)}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                        className="hover:bg-gray-700 cursor-pointer"
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-sm text-stone-200 font-bold">
                {studentViewCoursesList?.length || 0}{" "}
                {studentViewCoursesList?.length <= 1 ? "Course" : "Courses"}
              </span>
            </div>

            {/* Course List Placeholder */}
            <div className="space-y-4">
              {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                studentViewCoursesList.map((course, idx) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.45 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    onClick={() => handleCourseNavigate(course._id)}
                    className="flex flex-col sm:flex-row cursor-pointer items-center sm:items-start gap-4 p-4 rounded-xl 
                            border border-gray-700/60 bg-gray-800/60 backdrop-blur-md shadow-sm 
                            hover:shadow-lg transition-all duration-300 last:border-b-0"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 sm:w-60 sm:h-40 rounded-lg object-cover shadow-md"
                      />
                    </div>

                    {/* Middle: Title & Meta */}
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1 truncate">
                        {course.instructorName || "Unknown Instructor"}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs px-2 py-1 rounded-md bg-gray-800/70 border border-gray-700 text-gray-300">
                          {course?.curriculum?.length}{" "}
                          {course?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"}
                        </span>

                        <span className="text-xs px-2 py-1 rounded-md bg-indigo-600/10 text-indigo-300 border border-indigo-500/20">
                          {course?.level?.toUpperCase()} Level
                        </span>

                        {course.category && (
                          <span className="text-xs px-2 py-1 rounded-md bg-emerald-600/10 text-emerald-300 border border-emerald-500/20">
                            {course.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Price + CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 w-full sm:w-auto mt-3 sm:mt-0">
                      {/* Price */}
                      <div className="text-left sm:text-right">
                        <p className="text-indigo-300 font-bold text-lg">
                          ${course.pricing}
                        </p>
                        <p className="text-xs text-gray-400">
                          One-time payment
                        </p>
                      </div>

                      {/* CTA */}
                      {/* <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="px-4 py-2 w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 
                                text-white font-semibold shadow hover:scale-[1.02] transition"
                        onClick={() => handleCourseNavigate?.(course._id)}
                      >
                        Enroll
                      </motion.button> */}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 border border-dashed border-gray-700 rounded-xl">
                  No courses available
                </div>
              )}
            </div>
          </motion.main>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentViewCourses;
