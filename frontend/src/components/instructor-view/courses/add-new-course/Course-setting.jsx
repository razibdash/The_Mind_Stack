import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "@/context/instructor-context";
import React, { useContext } from "react";
import { uploadVideo } from "@/services";
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
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <label htmlFor="">Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-md p-2"
            onChange={handleUploadImage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
