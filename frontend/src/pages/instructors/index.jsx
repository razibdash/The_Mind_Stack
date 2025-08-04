import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { BarChart, Book, Component, LogOut } from "lucide-react";
import React, { useContext, useState } from "react";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
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
      Component: <InstructorCourses />,
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
      <aside className="w-64  border-r shadow hidden bg-[#3192C7] md:block">
        <div className="p-4">
          <div className="flex items-center justify-baseline space-x-1">
            <img
              src="/logo1.PNG"
              alt="Logo"
              className="w-18 h-18 object-contain"
            />
            <h1 className="font-bold text-2xl mt-2  text-white">Instructor</h1>
          </div>
          <nav className="mt-5">
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2 cursor-pointer"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.Component !== null ? menuItem.Component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;
