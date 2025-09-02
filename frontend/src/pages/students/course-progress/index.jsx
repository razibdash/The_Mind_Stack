import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import VideoPlayer from "@/components/video-player";
import Markdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
const CourseProgressPage = () => {
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log(courseId, "course id");

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(
      auth?.user?._id,
      courseId
    );
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }
  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [courseId]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(studentCurrentCourseProgress, "studentCurrentCourseProgress");

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-bold hidden md:block  ">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>

        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 mt-10 relative">
        {/* Video + Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full bg-black p-20">
            <VideoPlayer
              width="100%"
              height="480px"
              url={currentLecture?.videoUrl}
              onProgressUpdate={setCurrentLecture}
              progressData={currentLecture}
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3">{currentLecture?.title}</h2>
            <div className="prose prose-invert text-gray-300">
              {/* <Markdown>{currentLecture?.description}</Markdown> */}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {isSideBarOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed md:static top-[64px] md:top-0 right-0 bottom-0 w-[85%] md:w-[400px] bg-[#1c1d1f] border-l border-gray-700 z-30 flex flex-col shadow-lg"
            >
              <Tabs defaultValue="content" className="flex flex-col flex-1">
                <TabsList className="grid grid-cols-2 h-14 bg-gray-800 rounded-none">
                  <TabsTrigger
                    value="content"
                    className="text-white data-[state=active]:bg-gray-700"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="overview"
                    className="text-white data-[state=active]:bg-gray-700"
                  >
                    Overview
                  </TabsTrigger>
                </TabsList>

                {/* Content Tab */}
                <TabsContent value="content" className="flex-1">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-3">
                      {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                        (item) => {
                          const viewed =
                            studentCurrentCourseProgress?.progress?.find(
                              (p) => p.lectureId === item._id
                            )?.viewed;
                          return (
                            <div
                              key={item._id}
                              className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition"
                            >
                              {viewed ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Play className="h-4 w-4 text-gray-400" />
                              )}
                              <span>{item.title}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Overview Tab */}
                <TabsContent value="overview" className="flex-1">
                  <ScrollArea className="h-full scroll-auto">
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-3">
                        About this course
                      </h2>
                      <p className="text-gray-400">
                        {
                          studentCurrentCourseProgress?.courseDetails
                            ?.description
                        }
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lock Dialog */}
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Access Denied</DialogTitle>
            <DialogDescription>
              Please purchase this course to continue.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Completion Dialog */}
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>🎉 Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <span>You have completed the course.</span>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/student-courses")}>
                  My Courses
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseProgressPage;
