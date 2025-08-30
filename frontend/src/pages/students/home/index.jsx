import React from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, Settings, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
const StudentHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-12 px-6 lg:px-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2 lg:pr-12 text-center lg:text-left"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Learning that{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              gets you ahead
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Skills for your present and your future. <br />
            Take the first step with us today 🚀
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 
              text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img
            src="/banner-img.png"
            alt="Learning Banner"
            width={600}
            height={400}
            className="w-full max-w-lg h-auto rounded-2xl shadow-2xl border border-gray-700/40"
          />
        </motion.div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
      </section>
    </div>
  );
};

export default StudentHomePage;
