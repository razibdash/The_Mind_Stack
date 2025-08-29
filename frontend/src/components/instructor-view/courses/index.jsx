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
    <Card className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header with gradient */}
      <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          onClick={() => navigate("/instructor/create-new-course")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400   
                     text-white font-semibold rounded-lg shadow-lg transform transition-all
                     hover:scale-105 hover:shadow-xl active:scale-95"
        >
          Create New Course
        </Button>
      </CardHeader>

      <CardContent className="bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {listOfCourses.length > 0 ? (
                listOfCourses.map((course) => (
                  <TableRow
                    key={course._id}
                    className="transition-all duration-300 hover:bg-gradient-to-r 
                               hover:from-blue-50 hover:to-teal-50"
                  >
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell className="font-medium">
                      {course.students?.length}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${course?.pricing}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        onClick={() =>
                          navigate(`/instructor/edit-course/${course?._id}`)
                        }
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-full bg-gradient-to-r from-blue-300 to-teal-300 transition-all duration-300
                                   hover:bg-gradient-to-r hover:from-blue-300 hover:to-teal-300"
                      >
                        <Edit className="h-6 w-6 text-white hover:text-gray-900" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 transition-all duration-300
                                   hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-400"
                      >
                        <Delete className="h-6 w-6 text-white hover:text-gray-900" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-gray-400"
                  >
                    No courses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
