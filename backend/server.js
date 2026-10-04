require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Disable caching for API responses
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('/', (req, res) => {
    res.send('Claude CampusX Backend is running!');
});

// API routes
const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api', expenseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});