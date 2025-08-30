import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/course-landing-page";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-setting";
import Curriculum from "@/components/instructor-view/courses/add-new-course/CourseCirriculum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
  updateCourseByIdService,
} from "@/services";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { Tabs } from "@radix-ui/react-tabs";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCourse = () => {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }
  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }

    return hasFreePreview;
  }
  //
  async function handleSubmit() {
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
    };

    const response =
      currentEditedCourseId !== null
        ? await updateCourseByIdService(
            currentEditedCourseId,
            courseFinalFormData
          )
        : await addNewCourseService(courseFinalFormData);

    if (response?.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
      setCurrentEditedCourseId(null);
    }

    console.log(courseFinalFormData, "courseFinalFormData");
  }

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(
      currentEditedCourseId
    );

    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});

      console.log(setCourseFormData, response?.data, "setCourseFormData");
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }

    console.log(response, "response");
  }

  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold mb-4 md:mb-0 text-gray-800">
          Create a New Course
        </h1>
        <Button
          disabled={!validateFormData()}
          onClick={handleSubmit}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 
                    text-white font-bold tracking-wide shadow-lg hover:scale-105 
                    hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SUBMIT
        </Button>
      </div>

      {/* Main Card */}
      <Card className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <CardContent className="p-6 bg-white">
          <div className="container mx-auto">
            <Tabs defaultValue="curriculum" className="space-y-4">
              {/* Tabs List with gradient active indicator */}
              <TabsList className="bg-gray-100 rounded-lg shadow-inner p-1 flex space-x-2">
                <TabsTrigger
                  value="curriculum"
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold 
                            hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 
                            hover:text-white transition-all duration-300"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="course-landing-page"
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold 
                            hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 
                            hover:text-white transition-all duration-300"
                >
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="px-4 py-2 rounded-lg text-gray-700 font-semibold 
                            hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 
                            hover:text-white transition-all duration-300"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Tabs Content */}
              <TabsContent value="curriculum" className="mt-4">
                <Curriculum />
              </TabsContent>
              <TabsContent value="course-landing-page" className="mt-4">
                <CourseLandingPage />
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCourse;
