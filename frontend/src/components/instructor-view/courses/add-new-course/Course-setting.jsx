import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "@/context/instructor-context";
import React, { useContext } from "react";
import { uploadVideo } from "@/services";
import AiImageGenerator from "@/components/AI/AiImageGen";
const CourseSettings = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  //image upload from cloudinary
  const handleUploadImage = async (event) => {
    const { files } = event.target;
    const selectedFile = files[0];
    if (selectedFile) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedFile);
      try {
        const response = await uploadVideo(imageFormData);
        if (response) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response?.url,
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  console.log("Course Landing Form Data:", courseLandingFormData);
  return (
    <Card className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Gradient Header */}
      <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6">
        <CardTitle className="text-2xl font-extrabold">
          Course Settings
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="grid grid-cols-1 gap-6 bg-white p-6">
        {/* Upload Thumbnail Section */}
        <div className="flex flex-col gap-4">
          <label className="font-semibold text-gray-700">
            Upload Thumbnail
          </label>

          {courseLandingFormData.image && (
            <img
              src={courseLandingFormData.image}
              alt="Uploaded Thumbnail"
              className="rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            />
          )}

          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-lg p-2 transition-all duration-300 
                      hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={handleUploadImage}
          />
        </div>

        {/* AI Image Generator Section */}
        {/* <div
          className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg p-4 shadow-inner 
                        transition-all duration-300 hover:shadow-xl hover:scale-105 text-white"
        >
          <AiImageGenerator />
        </div> */}
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
