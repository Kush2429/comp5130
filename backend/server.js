const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const tableRoutes = require('./routes/tableRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');
const connectDB = require('./config/db'); // Import the DB connection

// Load environment variables
dotenv.config();

// Call the DB connection function
connectDB();  // <- This line connects to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tables', tableRoutes);
app.use('/api/auth', authRoutes);

// Start server with HTTPS
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/private.key'),
  cert: fs.readFileSync('path/to/certificate.crt')
};

https.createServer(options, app).listen(3000, () => {
  logger.info('Server started on https://localhost:3000');
});
