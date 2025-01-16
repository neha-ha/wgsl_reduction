const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Parser = require("tree-sitter");
const WGSL = require("C:\\Users\\nehab\\webgpu\\test\\grammar\\build\\Release\\tree_sitter_wgsl_binding.node");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Allow requests from React frontend

const parser = new Parser();
parser.setLanguage(WGSL);

// API to parse WGSL code into an AST
app.post("/wgsl-to-ast", (req, res) => {
  try {
    const wgslCode = req.body.code; // WGSL code from the request
    const tree = parser.parse(wgslCode);
    res.json({ ast: tree.rootNode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
