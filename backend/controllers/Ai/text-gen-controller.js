const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const { createPrompt } = require("../../config/prompt/ai-prompt.js");

const textGenController = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required." });
  }

  try {
   const response = await axios.post(
      "https://api.groq.com/v1/llm/predict",
      {
        model: "llama3-70b-8192",
        input: createPrompt(topic),
        temperature: 0.7,
        max_output_tokens: 1024,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    const description = response.data?.output?.[0]?.content?.[0]?.text;
    if (!description) {
      return res
        .status(500)
        .json({ error: "No content returned from Groq API." });
    }

    res.json({ description });
  } catch (err) {
    console.error("Error generating course description:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate course description." });
  }
};
module.exports = {
  textGenController,
};
