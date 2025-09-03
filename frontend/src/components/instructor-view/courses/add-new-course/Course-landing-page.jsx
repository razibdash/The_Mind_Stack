import AiTextGenerator from "@/components/AI/AiTextGenerator";
import FormControls from "@/components/common-from/from-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import React, { useContext, useState } from "react";

const CourseLandingPage = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  return (
    <Card className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Gradient Header */}
      <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6">
        <CardTitle className="text-3xl font-extrabold">
          Course Landing Page
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="grid grid-cols-1 gap-6 bg-white p-6">
        {/* Form Section */}
        <div className="flex flex-col gap-4">
          <FormControls
            title="Course Title"
            description="Course Description"
            onSubmit={(data) => console.log(data)}
            formControls={courseLandingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
          />
        </div>

        {/* AI Text Generator Section with animation */}

        {/* <AiTextGenerator /> */}
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
