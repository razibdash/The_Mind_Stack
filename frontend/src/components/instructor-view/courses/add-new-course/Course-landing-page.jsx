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
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent className={"grid grid-cols-2 gap-2"}>
        <FormControls
          title="Course Title"
          description="Course Description"
          onSubmit={(data) => console.log(data)}
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
        <AiTextGenerator />
      </CardContent>
    </Card>
  );
};

export default CourseLandingPage;
