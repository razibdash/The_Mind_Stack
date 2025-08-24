const cloudinary = require("cloudinary").v2;
const axios = require("axios");


const imageGen= async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // 1️⃣ Call Groq / LangChain API
    const groqResponse = await axios.post(
      "https://api.groq.ai/v1/generate-image",
      {
        prompt: prompt,
        size: "1024x1024"
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const base64Image = groqResponse.data.image; // assuming API returns base64
    const buffer = Buffer.from(base64Image, "base64");

    // 2️⃣ Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ imageUrl: result.secure_url });
      }
    );

    uploadResponse.end(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}

module.exports={
    imageGen
}