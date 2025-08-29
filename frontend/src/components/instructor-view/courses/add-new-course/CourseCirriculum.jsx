import ProgressBar from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaDeleteService, uploadVideo } from "@/services";
import { Upload } from "lucide-react";
import React, { useContext } from "react";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, index) {
    const { value } = event.target;
    setCourseCurriculumFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, title: value } : item
      )
    );
  }
  //handleFreePreviewChange
  const handleFreePreviewChange = (value, index) => {
    setCourseCurriculumFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, freePreview: value } : item
      )
    );
  };
  const handleLectureVideoUpload = async (event, index) => {
    const { files } = event.target;
    const selectedFile = files[0];
    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      try {
        setMediaUploadProgress(true);
        const response = await uploadVideo(videoFormData);
        setMediaUploadProgress(false);
        console.log("Video upload response:", response);
        if (response) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[index] = {
            ...cpyCourseCurriculumFormData[index],
            videoUrl: response?.url,
            public_id: response?.publicId,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
    // Here you would typically handle the file upload to your server or cloud storage
    //setMediaUploadProgress
  };
  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );
    console.log(deleteCurrentMediaResponse);
    if (deleteCurrentMediaResponse?.message === "Media deleted successfully") {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }
  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );
    console.log(deleteCurrentMediaResponse);
    if (deleteCurrentMediaResponse?.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }
  return (
    <Card className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Gradient Header */}
      <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6">
        <CardTitle className="text-2xl font-extrabold">
          Create Course Curriculum
        </CardTitle>

        <div>
          <Input
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
          />
          <Button
            as="label"
            htmlFor="bulk-media-upload"
            className="cursor-pointer flex items-center px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold
                      hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>

      <CardContent className="bg-white p-6">
        {/* Add Lecture Button */}
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
          className="mb-6 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 
                    text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Lecture
        </Button>

        {/* Media Upload Progress */}
        <div className="mt-6 space-y-4">
          {mediaUploadProgress && (
            <ProgressBar
              isMediaUploading={mediaUploadProgress}
              progress={400}
            />
          )}
        </div>

        {/* Curriculum List */}
        <div className="mt-6 space-y-6">
          {courseCurriculumFormData.map((curriculum, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h3 className="font-semibold text-lg">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-md"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    className={`${
                      curriculum.isFreePreview
                        ? "bg-gradient-to-r from-blue-500 to-teal-400"
                        : "bg-gray-200"
                    } transition-all duration-300`}
                    checked={curriculum.isFreePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <label
                    htmlFor={`freePreview-${index + 1}`}
                    className="font-medium"
                  >
                    Free Preview
                  </label>
                </div>
              </div>

              <div className="mt-4">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="450px"
                      height="200px"
                      className="rounded-lg shadow-md"
                    />
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleReplaceVideo(index)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 
                                  text-white font-semibold shadow hover:scale-105 transition-all duration-300"
                      >
                        Replace Video
                      </button>
                      <button
                        onClick={() => handleDeleteLecture(index)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-800 
                                  text-white font-semibold shadow hover:scale-105 transition-all duration-300"
                      >
                        Delete Lecture
                      </button>
                    </div>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="w-full rounded-lg border border-gray-300 p-2 transition-all duration-300 
                              hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    onChange={(event) => handleLectureVideoUpload(event, index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
