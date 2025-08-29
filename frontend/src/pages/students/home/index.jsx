import React from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, Settings, LogOut, User } from "lucide-react";

const StudentDashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-teal-500 text-white shadow-lg flex flex-col">
        <div className="p-6 flex items-center space-x-2 border-b border-white/20">
          <img src="/logo1.PNG" alt="Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-xl font-bold">Student Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/student"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition"
          >
            <Home className="h-5 w-5" /> <span>Dashboard</span>
          </Link>
          <Link
            to="/courses"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition"
          >
            <BookOpen className="h-5 w-5" /> <span>My Courses</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition"
          >
            <User className="h-5 w-5" /> <span>Profile</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition"
          >
            <Settings className="h-5 w-5" /> <span>Settings</span>
          </Link>
        </nav>
        <button className="flex items-center space-x-2 p-4 border-t border-white/20 hover:bg-white/20 transition">
          <LogOut className="h-5 w-5" /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, Student 👋
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src="/student-avatar.png"
              alt="Student"
              className="h-10 w-10 rounded-full border-2 border-blue-500"
            />
          </div>
        </header>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700">
              Enrolled Courses
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700">
              Completed Lessons
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">32</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700">
              Achievements
            </h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">3</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Completed "React Basics" lesson</li>
            <li>📌 Started "Node.js Fundamentals"</li>
            <li>🏆 Earned "JavaScript Pro" badge</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
