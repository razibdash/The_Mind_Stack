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
    <div className=" p-6 border mt-5 rounded  space-y-4 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-center">AI Image Generator</h2>
      {/* Input Field + Button */}
      <div className="flex relative">
        <Input
          placeholder="Enter your image prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          className="bg-[#3192C7] hover:bg-[#1E6F9D] absolute  right-0 "
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Generate"}
        </Button>
      </div>

      {/* Image Display */}
      {loading && (
        <p className="text-center text-gray-500">Generating your image...</p>
      )}

      {imageUrl && (
        <Card className="shadow-lg">
          <CardContent className="p-4 flex flex-col items-center space-y-4">
            <img
              src={imageUrl}
              alt="Generated"
              className="max-w-full rounded-lg shadow-md"
            />
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
