import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { BarChart, Book, Component, LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);
  const fetchAllCourses = async () => {
    const response = await fetchInstructorCourseListService();

    if (response?.success) {
      setInstructorCoursesList(response?.data);
    }
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      Component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      Component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      Component: null,
    },
  ];
  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r shadow hidden md:block bg-gradient-to-b from-blue-500 to-teal-400">
        <div className="p-6">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo1.PNG"
              alt="Logo"
              className="w-16 h-16 object-contain rounded-lg shadow-lg"
            />
            <h1 className="font-extrabold text-2xl text-white tracking-wide drop-shadow-md">
              Instructor
            </h1>
          </div>

          {/* Menu */}
          <nav className="mt-8 space-y-2">
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.value}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                className={`w-full justify-start px-4 py-3 font-medium text-sm rounded-lg transition-all duration-300
                  ${
                    activeTab === menuItem.value
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-white/20 hover:backdrop-blur-sm"
                  }`}
              >
                <menuItem.icon className="mr-3 h-5 w-5" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
            Dashboard
            <span className="text-lg font-medium text-gray-500">
              | Instructor Panel
            </span>
          </h1>

          {/* Tabs Content Area with Glass Effect */}
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {menuItems.map((menuItem) => (
                <TabsContent key={menuItem.value} value={menuItem.value}>
                  {menuItem.Component !== null ? menuItem.Component : null}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;
