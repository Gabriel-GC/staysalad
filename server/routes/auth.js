const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-staysalad-2026';

// POST Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    
    // Set cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ success: true, token, user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Logout
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true, message: 'Logged out' });
});

// GET Me (Check auth)
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: { username: decoded.username } });
  } catch (err) {
    res.status(401).json({ success: false });
  }
});

module.exports = router;
