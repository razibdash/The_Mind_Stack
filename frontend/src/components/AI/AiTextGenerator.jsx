import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { generateAiTextService } from "@/services";
import { Copy, Check } from "lucide-react";
const AiTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await generateAiTextService(inputText);
    console.log("AI Response:", res.description);
    if (res && res.description) {
      setAiText(res.description);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 border mt-8 rounded-2xl space-y-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl">
      <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3192C7] to-[#1E6F9D]">
        ✨ AI Text Generator
      </h2>

      {/* Input + Button */}
      <div className="flex relative group">
        <Input
          placeholder="💡 Enter your creative prompt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="pr-32 rounded-xl shadow-sm focus:ring-2 focus:ring-[#3192C7] transition-all"
        />
        <Button
          className="bg-gradient-to-r from-[#3192C7] to-[#1E6F9D] hover:from-[#1E6F9D] hover:to-[#145373] text-white absolute right-1 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">⚡ Generating...</span>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {/* AI Output with Copy Button */}
      {aiText && (
        <div className="relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* AI Generated Text */}
          <Markdown>{aiText}</Markdown>
        </div>
      )}
    </div>
  );
};

export default AiTextGenerator;
