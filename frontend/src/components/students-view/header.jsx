import { Ghost, GraduationCap, TvMinimalPlay } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-context";
import { Menu, X } from "lucide-react";
const StudentViewCommonHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resetCredentials } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <header
      className="sticky  top-0 z-50 w-full bg-gradient-to-r 
      from-gray-900/95 via-gray-800/90 to-gray-900/95 text-white 
      shadow-xl border-b border-gray-700/60 backdrop-blur-lg"
    >
      {/* Main Container */}
      <div className="flex items-center max-w-7xl mx-auto  justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center  space-x-6">
          {/* Logo + Brand */}
          <Link
            to="/home"
            className="flex items-center group transition-all hover:scale-105"
          >
            <GraduationCap
              className="h-9 w-9 mr-3 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.7)] 
              group-hover:text-blue-500 transition-colors"
            />
            <span
              className="font-extrabold tracking-wide text-lg md:text-xl 
              bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 
              group-hover:from-blue-500 group-hover:to-teal-400 transition-colors"
            >
              MindStack
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/courses")}
            className="px-5 py-2.5 rounded-xl 
              bg-gradient-to-r from-blue-500 to-teal-500 
              hover:from-blue-600 hover:to-teal-600 
              text-white font-semibold shadow-lg hover:shadow-xl 
              transition-all duration-300"
          >
            Explore Courses
          </Button>

          <div
            onClick={() => {
              navigate("/student-courses");
            }}
            className="flex items-center gap-2 cursor-pointer group relative"
          >
            <span
              className="font-medium text-gray-300 group-hover:text-blue-400 
              transition-colors duration-300"
            >
              My Courses
            </span>
            <TvMinimalPlay
              className="h-6 w-6 text-gray-400 
              group-hover:text-blue-400 transition-colors duration-300"
            />
            <span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 rounded-full 
              group-hover:w-full transition-all duration-300"
            ></span>
          </div>

          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="px-5 py-2.5 rounded-xl font-medium
              bg-gradient-to-r from-gray-800 to-gray-700 hover:from-red-600 hover:to-red-700
              text-gray-300 hover:text-white 
              shadow-md hover:shadow-red-500/30
              border border-gray-600 hover:border-red-600
              transition-all duration-300"
          >
            Sign Out
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          className="md:hidden px-6 pb-4 space-y-4 bg-gradient-to-b 
          from-gray-900/95 via-gray-800/90 to-gray-900/95 border-t border-gray-700/60 shadow-lg"
        >
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/courses");
              setIsMenuOpen(false);
            }}
            className="w-full mt-4 px-5 py-2.5 rounded-xl 
              bg-gradient-to-r from-blue-500 to-teal-500 
              hover:from-blue-600 hover:to-teal-600 
              text-white font-semibold shadow-lg hover:shadow-xl 
              transition-all duration-300"
          >
            Explore Courses
          </Button>

          <div
            onClick={() => {
              navigate("/student-courses");
              setIsMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 cursor-pointer group relative"
          >
            <span
              className="font-medium text-gray-300 group-hover:text-blue-400 
              transition-colors duration-300"
            >
              My Courses
            </span>
            <TvMinimalPlay
              className="h-6 w-6 text-gray-400 
              group-hover:text-blue-400 transition-colors duration-300"
            />
          </div>

          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full px-5 py-2.5 rounded-xl font-medium
              bg-gradient-to-r from-gray-800 to-gray-700 hover:from-red-600 hover:to-red-700
              text-gray-300 hover:text-white 
              shadow-md hover:shadow-red-500/30
              border border-gray-600 hover:border-red-600
              transition-all duration-300"
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
};

export default StudentViewCommonHeader;
