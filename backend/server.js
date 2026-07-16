const express = require("express");
const cors = require("cors");
const { ESLint } = require("eslint");

const app = express();

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

    res.json({
      success: true,
      issues: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});