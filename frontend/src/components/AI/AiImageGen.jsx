import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";

export default function AiImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl(null);

    try {
      // Replace with your actual image generation API call
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setImageUrl(data.imageUrl); // assuming API returns { imageUrl: "..." }
    } catch (error) {
      console.error("Image generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png";
    link.click();
  };

  return (
    <div className="p-8 border mt-8 rounded-2xl space-y-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl">
      <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3192C7] to-[#1E6F9D]">
        🚀 AI Thumbnail Generator
      </h2>

      {/* Input Field + Button */}
      <div className="flex relative group">
        <Input
          placeholder="✨ Enter your creative prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="pr-28 text-stone-700 rounded-xl shadow-sm focus:ring-2 focus:ring-[#3192C7] transition-all"
        />
        <Button
          className="bg-gradient-to-r from-[#3192C7] to-[#1E6F9D] hover:from-[#1E6F9D] hover:to-[#145373] text-white absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate"}
        </Button>
      </div>

      {/* Loading Text */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          🎨 Generating your amazing image...
        </p>
      )}

      {/* Image Display */}
      {imageUrl && (
        <Card className="shadow-xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl transition-all hover:scale-[1.01]">
          <CardContent className="p-5 flex flex-col items-center space-y-5">
            <img
              src={imageUrl}
              alt="Generated"
              className="max-w-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all"
            />
            <Button
              variant="secondary"
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#3192C7] to-[#1E6F9D] text-white hover:opacity-90 shadow-lg hover:scale-105 transition-all"
            >
              <Download className="w-5 h-5" /> Download
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
