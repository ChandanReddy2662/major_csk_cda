// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, username, age, email, password, phoneNumber } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, age, email, password: hashedPassword, phonenumber: phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isApproved && !user.isAdmin) {
      return res.status(403).json({ message: 'Account pending admin approval' });
    }
    console.log(user)

    const signOut = 30 * 24 * 60 * 60 * 1000
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: signOut });
    res.json({ token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin, 
      isApproved: user.isApproved, email: user.email, socialScore: user.socialScore, phonenumber: user.phonenumber } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;