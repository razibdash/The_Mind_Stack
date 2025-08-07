import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
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
  const isCourseCurriculumFormDataValid = () => {
    // Implement validation logic here
  };
  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }
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
          // disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
          className="bg-[#3192C7] hover:bg-[#1E6F9D] text-white"
        >
          Add Lecture
        </Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculum, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  // onChange={(event) => handleCourseTitleChange(event, index)}
                  // value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={false}
                    id={`freePreview-${index + 1}`}
                    // onCheckedChange={(checked) => handleFreeSwitchChange(checked, index)}
                  />
                  <label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </label>
                </div>
              </div>
              <div className={`mt-4`}>
                <Input
                  type="file"
                  accept="video/*"
                  className="w-full"
                  // onChange={(event) => handleLectureDescriptionChange(event, index)}
                  // value={courseCurriculumFormData[index]?.description}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
