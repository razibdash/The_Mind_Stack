import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";

function StudentViewCommonLayout() {
  const location = useLocation();
  return (
    <div>
      {/* {!location.pathname.includes("course-progress") ? (
        <StudentViewCommonHeader />
      ) : null}

      <Outlet /> */}

      <h1>StudentViewCommonLayout</h1>
    </div>
  );
}

export default StudentViewCommonLayout;
