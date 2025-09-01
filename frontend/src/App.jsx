import { useContext } from "react";
import { Button } from "./components/ui/button";
import { Route, Router, Routes } from "react-router-dom";
import AuthIndex from "./pages/auth";
import { AuthContext } from "./context/auth-context";
import RouteGuard from "./components/route-guard";
import InstructorDashboardPage from "./pages/instructors";
import StudentViewCommonLayout from "./components/students-view/common-layout";
import Header from "./components/students-view/header";
import { Skeleton } from "./components/ui/skeleton";
import StudentDashboardPage from "./pages/students/home";
import NotFound from "./pages/not-found";
import AddNewCourse from "./pages/instructors/add-new-course";
import StudentHomePage from "./pages/students/home";
import StudentViewCourses from "./pages/students/courses";
import StudentCourseDetailsPage from "./pages/students/course-details";
import PaymentSuccess from "./pages/students/payment-success/PaymentSuccess";
import PaymentCancel from "./pages/students/payment-return/PaymentReturn";
import StudentBoughtCoursesPage from "./pages/students/student-courses";

function App() {
  const { auth, loading } = useContext(AuthContext);
  if (loading) {
    return <Skeleton />;
  } else {
    return (
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<AuthIndex />}
            />
          }
        />

        <Route
          path="/instructor"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<InstructorDashboardPage />}
            />
          }
        />
        <Route
          path="/instructor/create-new-course"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<AddNewCourse />}
            />
          }
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<AddNewCourse />}
            />
          }
        />

        <Route
          path="/"
          element={
            <RouteGuard
              element={<StudentViewCommonLayout />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        >
          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<StudentViewCourses />} />
          <Route
            path="courses/details/:id"
            element={<StudentCourseDetailsPage />}
          />
          {/* ✅ Stripe success page */}
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-cancel" element={<PaymentCancel />} />
          <Route
            path="student-courses"
            element={<StudentBoughtCoursesPage />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export default App;
