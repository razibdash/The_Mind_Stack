import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ isMediaUploading, progress }) => {
  const [showProgress, setShowProgress] = useState(true);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  useEffect(() => {
    if (isMediaUploading) {
      setAnimatedProgress(progress);
      setShowProgress(true);
    } else {
      const timer = setTimeout(() => {
        setShowProgress(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMediaUploading, progress]);
  return (
    <div className="w-full max-w-lg">
      {isMediaUploading ? (
        <div className="relative w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden shadow-md">
          {/* Progress Bar */}
          <motion.div
            className="h-3 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 rounded-full shadow-inner"
            style={{ width: `${animatedProgress}%` }}
            initial={{ width: 0 }}
            animate={{
              width: `${animatedProgress}%`,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            {/* Shimmer effect */}
            {progress <= 100 && (
              <motion.div
                className="absolute top-0 left-0 h-3 w-1/3 bg-white/40 blur-md"
                animate={{ x: ["-30%", "120%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Overflow check indicator */}
            {progress > 100 && (
              <motion.div
                className="absolute inset-0 bg-red-500/40"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="mt-2 text-center font-semibold text-green-600 bg-green-100 border border-green-300 rounded-lg py-2 shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          ✅ Upload Complete!
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;
