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
      <aside className="w-64 bg-white border-r shadow hidden md:block">
        <div className="p-4">
          <h2 className="font-bold text-lg text-[#3192C7]">
            Instructor Dashboard
          </h2>
          <nav className="mt-4">
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
