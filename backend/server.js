// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const tableRoutes = require("./routes/tableRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

dotenv.config();
const connectDB = require("./config/db");

// Connect to the database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the frontend public folder
app.use(express.static(path.join(__dirname, "../frontend/public"))); // Corrected path

// Route for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/login.html")); // Corrected path
});

// Routes
app.use("/api/tables", tableRoutes);
app.use("/api/auth", authRoutes);

// Start server with HTTPS
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./certs/private.key"),
  cert: fs.readFileSync("./certs/certificate.crt"),
};

https.createServer(options, app).listen(3000, () => {
  console.log("Server running on https://localhost:3000");
});
