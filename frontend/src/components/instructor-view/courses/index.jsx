import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const InstructorCourses = ({ listOfCourses }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          onClick={() => navigate("/instructor/create-new-course")}
          className="p-6 bg-[#3192C7] hover:bg-[#1E6F9D] cursor-pointer"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Mern Stack</TableCell>
                <TableCell className="font-medium">30</TableCell>
                <TableCell className="font-medium">$3000</TableCell>
                <TableCell className="text-right flex justify-end">
                  <Button
                    onClick={() => {
                      navigate(`/instructor/edit-course/${course?._id}`);
                    }}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer "
                  >
                    <Edit className="h-6 w-6 text-[#1E6F9D] " />
                  </Button>
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    <Delete className="h-6 w-6 text-[#c41247] " />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
