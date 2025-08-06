import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import React from "react";

const Curriculum = () => {
  const isCourseCurriculumFormDataValid = () => {
    // Implement validation logic here
  };
  const handleNewLecture = () => {
    // Implement logic to handle adding a new lecture
  };
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
      </CardContent>
    </Card>
  );
};

export default Curriculum;
