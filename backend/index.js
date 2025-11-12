// File: server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
const GetResponse = require("./src/controllers/ai.doubts");
const dotenv = require('dotenv')
dotenv.config();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json());

// Mock chat endpoint
app.post('/doubts',GetResponse);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
