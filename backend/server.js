const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Code Review Backend Running");
});

app.post("/api/review", (req, res) => {
  const { code } = req.body;

  console.log("Received Code:");
  console.log(code);

  res.json({
    success: true,
    message: "Code received successfully",
    code: code,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});