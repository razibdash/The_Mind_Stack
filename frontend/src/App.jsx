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
import AddNewCourse from "./components/instructor-view/courses/add-new-course";

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
          path="/"
          element={
            <RouteGuard
              authenticated={auth?.authenticate}
              user={auth?.user}
              element={<StudentViewCommonLayout />}
            />
          }
        >
          <Route path="home" element={<StudentDashboardPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export default App;
