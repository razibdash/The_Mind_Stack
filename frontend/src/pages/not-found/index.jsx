import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 text-white text-center p-6">
      <h1 className="text-8xl font-extrabold drop-shadow-lg">404</h1>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-lg text-white/80 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
