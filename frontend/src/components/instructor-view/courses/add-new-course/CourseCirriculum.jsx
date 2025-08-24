import ProgressBar from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { uploadVideo } from "@/services";
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
  console.log(courseCurriculumFormData);
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
            type="file"
            // ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            // onChange={handleMediaBulkUpload}
          />
          <Button
            as="label"
            htmlFor="bulk-media-upload"
            variant="outline"
            className="cursor-pointer bg-[#3192C7] hover:bg-[#1E6F9D] text-white hover:text-white"
            // onClick={handleOpenBulkUploadDialog}
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
          className="bg-[#3192C7] hover:bg-[#1E6F9D] text-white"
        >
          Add Lecture
        </Button>
        <div className="mt-10 space-y-4">
          {mediaUploadProgress ? (
            <ProgressBar
              isMediaUploading={mediaUploadProgress}
              progress={400}
            />
          ) : null}
        </div>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculum, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    className={`${
                      curriculum.isFreePreview ? "bg-[#3192C7]" : "bg-gray-200"
                    }`}
                    checked={curriculum.isFreePreview}
                    id={`freePreview-${index + 1}`}
                    // onCheckedChange={(checked) => handleFreeSwitchChange(checked, index)}
                  />
                  <label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </label>
                </div>
              </div>
              <div className={`mt-4`}>
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                    />
                    <div className="">
                      <button className="bg-blue-600 text-stone-200 rounded px-4 py-2 mr-2">
                        replace video
                      </button>
                      <button className="bg-red-900 text-stone-200 rounded px-4 py-2">
                        delete lecture
                      </button>
                    </div>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="w-full"
                    onChange={(event) => handleLectureVideoUpload(event, index)}
                    // value={courseCurriculumFormData[index]?.description}
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
