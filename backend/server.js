require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ESLint } = require("eslint");
const OpenAI = require("openai");

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Code Review Backend Running");
});

app.post("/api/review", async (req, res) => {
  const { code } = req.body;

  try {
    const eslint = new ESLint({
      overrideConfigFile: "eslint.config.js",
    });

    const results = await eslint.lintText(code, {
      filePath: "review.js",
    });

    const messages = results[0].messages;

    const aiResponse = await openai.responses.create({
      model: "gpt-5-mini",
      input: `You are an AI code review assistant.

Review the following code and give:
1. Bugs
2. Code quality issues
3. Improvement suggestions
4. Best practice recommendations

Code:
${code}`,
    });

    res.json({
      success: true,
      issues: messages,
      aiReview: aiResponse.output_text,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});