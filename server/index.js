const express = require('express');
const connectDB = require('./db');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB();

// Routes
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));
app.use('/auth', require('./routes/auth'));
app.use('/settings', require('./routes/settings'));

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;
