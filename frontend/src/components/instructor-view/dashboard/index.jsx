import { InstructorContext } from "@/context/instructor-context";
import { fetchAllCountCourses, fetchStudentCountCourses } from "@/services";
import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const InstructorDashboard = () => {
  const { fetchAllCountCourse, setFetchAllCountCourse } =
    useContext(InstructorContext);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalPurchases: 0,
  });
  const [loading, setLoading] = useState(true);
  const fetchDashboardStats = async () => {
    try {
      const res = await fetchStudentCountCourses();
      if (res.success) {
        console.log(res);
        setStats(res.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountCourse = async () => {
    try {
      const response = await fetchAllCountCourses();
      if (response.success) {
        setFetchAllCountCourse(response.count);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountCourse();
  }, []);
  useEffect(() => {
    fetchDashboardStats();
  }, []);
  const chartData = [
    { name: "Courses", value: stats.totalCourses },
    { name: "Students", value: stats.totalStudents },
    { name: "Purchases", value: stats.totalPurchases },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Instructor Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <p className="text-3xl font-bold text-blue-600">
            {loading ? "..." : stats.totalCourses}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-3xl font-bold text-green-600">
            {loading ? "..." : stats.totalStudents}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold">Total Purchases</h2>
          <p className="text-3xl font-bold text-purple-600">
            {loading ? "..." : stats.totalPurchases}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InstructorDashboard;
