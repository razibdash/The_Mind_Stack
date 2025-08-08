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
    <div>
      {isMediaUploading ? (
        <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden dark:bg-gray-700">
          <motion.div
            className=" h-2.5 bg-blue-600 rounded-full"
            style={{ width: `${animatedProgress}%` }}
            initial={{ width: 0 }}
            animate={{
              width: `${animatedProgress}%`,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            exit={{ width: 0 }}
          >
            {progress > 100 && isMediaUploading && (
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 opacity-50 inset-0 bg-red-500 "
                animate={{
                  x: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </motion.div>
        </div>
      ) : (
        <div>Upload Complete</div>
      )}
    </div>
  );
};

export default ProgressBar;
