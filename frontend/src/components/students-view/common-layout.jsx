import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import Footer from "./footer";

function StudentViewCommonLayout() {
  const location = useLocation();
  return (
    <div>
      <StudentViewCommonHeader />

      <Outlet />
      <Footer />
    </div>
  );
}

export default StudentViewCommonLayout;
