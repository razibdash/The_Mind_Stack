import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const CourseSettings = () => {
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
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSettings;
