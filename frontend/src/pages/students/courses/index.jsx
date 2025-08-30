import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useState } from "react";
import { sortOptions, filterOptions } from "@/config";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
const StudentViewCourses = () => {
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({});
  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-gradient-x opacity-95"></div>

      <div className="container mx-auto relative z-10 p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-white tracking-wide">
          All Courses
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            className="w-full md:w-72 bg-gray-800/50 rounded-2xl p-6 shadow-xl backdrop-blur-md"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {Object.keys(filterOptions).map((keyItem) => (
              <div key={keyItem} className="mb-6 border-b border-gray-700 pb-4">
                <h3 className="font-bold mb-4 text-gray-200 text-lg">
                  {keyItem.toUpperCase()}
                </h3>
                <div className="grid gap-3 mt-2">
                  {filterOptions[keyItem].map((option) => {
                    const isChecked =
                      filters &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1;

                    return (
                      <motion.div
                        key={option.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={
                            isChecked
                              ? { scale: [0.7, 1.2, 1], rotate: [0, 15, 0] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <Checkbox
                            checked={isChecked}
                            // onCheckedChange={() =>
                            //   handleFilterOnChange(keyItem, option)
                            // }
                          />
                        </motion.div>
                        <Label className="font-medium text-gray-300 cursor-pointer">
                          {option.label}
                        </Label>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.aside>

          {/* Main Section */}
          <motion.main
            className="flex-1 bg-gray-900/40 rounded-2xl p-6 shadow-xl backdrop-blur-lg"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {/* Sort Button */}
            <div className="flex justify-end items-center mb-6 gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center bg-gray-800 gap-2 px-6 py-3 text-white border-gray-600 hover:bg-gray-800 hover:text-stone-200 transition-all"
                  >
                    <ArrowUpDownIcon className="h-5 w-5" />
                    <span className="text-[16px] font-medium">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[200px] bg-gray-800 text-white border border-gray-700"
                >
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => setSort(value)}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                        className="hover:bg-gray-700 cursor-pointer"
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Course List Placeholder */}
            <div className="text-gray-300 text-center py-20 border border-dashed border-gray-600 rounded-xl">
              Courses will appear here 🚀
            </div>
          </motion.main>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentViewCourses;
