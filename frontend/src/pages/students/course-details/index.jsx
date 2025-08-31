import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentsViewCourseDetailsService } from "@/services";
import {
  Calendar,
  CheckCircle,
  Globe,
  Lock,
  PlayCircle,
  Users,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Markdown from "react-markdown";

const StudentCourseDetailsPage = () => {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const FetchCourseDataById = async () => {
    try {
      const response = await fetchStudentsViewCourseDetailsService(
        currentCourseDetailsId
      );
      if (response?.success) {
        setStudentViewCourseDetails(response?.data);
        console.log("Course Details Data:", response?.data);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  useEffect(() => {
    if (currentCourseDetailsId !== null) {
      FetchCourseDataById();
    }
  }, [currentCourseDetailsId]);

  useEffect(() => {
    console.log("Current Course Details ID:", currentCourseDetailsId);
  }, [currentCourseDetailsId]);
  useEffect(() => {
    if (id) {
      setCurrentCourseDetailsId(id);
    }
  }, [id]);
  function handleSetFreePreview(getCurrentVideoInfo) {
    console.log(getCurrentVideoInfo);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }
  const handleCreatePayment = () => {
    // Implement your logic for creating a payment here
  };
  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  return (
    <div className="mx-auto p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-gradient-to-br max-w-7xl  mx-auto
                    text-white md:p-8 p-2  overflow-hidden"
      >
        {/* Subtle background animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png')] opacity-20"
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-extrabold mb-4 drop-shadow-md"
          >
            {studentViewCourseDetails?.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-indigo-100/90 mb-6 max-w-3xl"
          >
            {studentViewCourseDetails?.subtitle}
          </motion.p>

          {/* Course meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-sm text-indigo-100"
          >
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <Users className="h-4 w-4 text-pink-300" />
              {studentViewCourseDetails?.students?.length}{" "}
              {studentViewCourseDetails?.students?.length <= 1
                ? "Student"
                : "Students"}
            </span>

            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <Calendar className="h-4 w-4 text-emerald-300" />
              {studentViewCourseDetails?.date?.split("T")[0]}
            </span>

            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <Globe className="h-4 w-4 text-yellow-300" />
              {studentViewCourseDetails?.primaryLanguage}
            </span>

            <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              By {studentViewCourseDetails?.instructorName}
            </span>
          </motion.div>
        </div>
      </motion.div>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto text-stone-200 gap-8 mt-10">
        {/* Main Section */}
        <main className="flex-grow md:p-7 md:w-[calc(100%-450px)]">
          {/* What you'll learn */}
          <motion.div whileHover={{ scale: 1.01 }} className="mb-8">
            <Card className="bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-gray-600 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-stone-100">
                  📘 What you'll learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {studentViewCourseDetails?.objectives
                    .split(",")
                    .map((objective, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start bg-gray-700/40 px-3 py-2 rounded-lg"
                      >
                        <CheckCircle className="mr-2 h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-stone-400">{objective}</span>
                      </motion.li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div whileHover={{ scale: 1.01 }} className="mb-8">
            <Card className="bg-gray-800/50 border border-gray-700 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-stone-200">
                  📝 Course Description
                </CardTitle>
              </CardHeader>
              <CardContent
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none 
                              break-words overflow-hidden"
              >
                <Markdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} className=" hover:underline break-words" />
                    ),
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="max-w-full h-auto rounded-lg shadow-md my-2"
                      />
                    ),
                    pre: ({ node, ...props }) => (
                      <pre
                        {...props}
                        className="overflow-x-auto  text-sm p-3 rounded-lg"
                      />
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        {...props}
                        className=" px-1 py-0.5 rounded text-sm break-words"
                      />
                    ),
                  }}
                >
                  {studentViewCourseDetails?.description}
                </Markdown>
              </CardContent>
            </Card>
          </motion.div>

          {/* Curriculum */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-gray-800/50 border border-gray-700 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-stone-200">
                  📂 Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentViewCourseDetails?.curriculum?.map(
                  (curriculumItem, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`${
                        curriculumItem?.freePreview
                          ? "cursor-pointer hover:bg-gray-700/40"
                          : "cursor-not-allowed opacity-50"
                      } flex items-center mb-3 px-3 py-2 rounded-lg transition`}
                      onClick={
                        curriculumItem?.freePreview
                          ? () => handleSetFreePreview(curriculumItem)
                          : null
                      }
                    >
                      {curriculumItem?.freePreview ? (
                        <PlayCircle className="mr-2 h-5 w-5 text-blue-400" />
                      ) : (
                        <Lock className="mr-2 h-5 w-5 text-red-400" />
                      )}
                      <span className="text-stone-400">
                        {curriculumItem?.title}
                      </span>
                    </motion.li>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>

        {/* Sidebar */}
        <aside className="w-full md:p-7  md:w-[450px]">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="sticky top-6 bg-gray-800/70 border border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="aspect-video mb-4 rounded-lg overflow-hidden border border-gray-600">
                  <VideoPlayer
                    width="100%"
                    height="220px"
                    url={studentViewCourseDetails?.previewVideoUrl}
                  />
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-green-400">
                    ${studentViewCourseDetails?.pricing}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 w-full rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 
                             text-white font-semibold shadow-lg hover:shadow-xl transition"
                  onClick={handleCreatePayment}
                >
                  🚀 Enroll Now
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </aside>
      </div>

      {/* Free Preview Dialog */}
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[800px] bg-gray-900 text-gray-100 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">🎬 Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 mb-4">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="100%"
              height="220px"
            />
          </div>
          <div className="flex flex-col gap-2">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  key={filteredItem?.title}
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium hover:text-blue-400"
                >
                  {filteredItem?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentCourseDetailsPage;
