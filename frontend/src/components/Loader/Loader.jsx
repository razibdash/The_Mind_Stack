import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-transparent border-b-purple-500 rounded-full"></div>
      </motion.div>
      <motion.span
        className="ml-4 text-lg font-medium text-gray-300"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.span>
    </div>
  );
}
