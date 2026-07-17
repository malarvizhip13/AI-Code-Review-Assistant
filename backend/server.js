require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const cors = require("cors");
const { ESLint } = require("eslint");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
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

function generateDocumentation(code) {
  const documentation = [];

  const functionMatches = code.match(
    /function\s+(\w+)\s*\((.*?)\)/g
  ) || [];

  functionMatches.forEach((func) => {
    const match = func.match(
      /function\s+(\w+)\s*\((.*?)\)/
    );

    documentation.push({
      type: "Function",
      name: match[1],
      description: `This function is used to perform the ${match[1]} operation.`,
      parameters: match[2] || "No parameters",
    });
  });

  const classMatches = code.match(
    /class\s+(\w+)/g
  ) || [];

  classMatches.forEach((className) => {
    const name = className.replace("class ", "");

    documentation.push({
      type: "Class",
      name: name,
      description: `This class is used to define the ${name} structure.`,
    });
  });

  return documentation;
}
app.get("/", (req, res) => {
  res.send("AI Code Review Backend Running");
});
app.get("/api/reviews", async (req, res) => {
  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/api/github", async (req, res) => {
  try {
    const { repo } = req.query;

    const response = await axios.get(
      `https://api.github.com/repos/${repo}/contents`
    );

    res.json({
      success: true,
      files: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
app.get("/api/github/file", async (req, res) => {
  try {
    const { repo, path } = req.query;

    const response = await axios.get(
      `https://api.github.com/repos/${repo}/contents/${path}`
    );

    const content = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf-8");

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
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
    const documentation = generateDocumentation(code);
const { data: savedReview, error: saveError } =
  await supabase
    .from("reviews")
    .insert([
      {
        code: code,
        issues: messages,
        complexity: complexity,
        documentation: documentation,
      },
    ])
    .select()
    .single();

if (saveError) {
  throw saveError;
}
   res.json({
  success: true,
  issues: messages,
  aiReview:
    "AI review is currently unavailable because API credits are not available.",
  complexity: complexity,
  documentation: documentation,
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