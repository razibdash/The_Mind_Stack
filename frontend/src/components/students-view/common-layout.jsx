import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";

function StudentViewCommonLayout() {
  const location = useLocation();
  return (
    <div>
      <StudentViewCommonHeader />

      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
