require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ESLint } = require("eslint");

const app = express();

app.use(cors());
app.use(express.json());

function calculateComplexity(code) {
  const lines = code.split("\n");

  const functions = (code.match(/\bfunction\b/g) || []).length;

  const classes = (code.match(/\bclass\b/g) || []).length;

  const logicalLines = lines.filter(
    (line) => line.trim() !== ""
  ).length;

  const conditions = (
    code.match(/\b(if|for|while|case|catch)\b/g) || []
  ).length;

  const cyclomaticComplexity = conditions + 1;

  return {
    linesOfCode: logicalLines,
    functions: functions,
    classes: classes,
    cyclomaticComplexity: cyclomaticComplexity,
  };
}

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

    const complexity = calculateComplexity(code);

    res.json({
      success: true,
      issues: messages,
      aiReview:
        "AI review is currently unavailable because API credits are not available.",
      complexity: complexity,
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