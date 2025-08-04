import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AiTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // Simulated API call or AI response (replace this with your actual AI call)
    setTimeout(() => {
      setAiText(`AI Response for: "${inputText}"`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className=" p-6 border mt-5 rounded  space-y-4 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-center">AI Text Generator</h2>

      <div className="flex relative">
        <Input
          placeholder="Enter your prompt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <Button
          className="bg-[#3192C7] hover:bg-[#1E6F9D] absolute  right-0 "
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {aiText && (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-800 dark:text-gray-200">
          {aiText}
        </div>
      )}
    </div>
  );
};

export default AiTextGenerator;
