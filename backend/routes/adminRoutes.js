// server/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Donation = require('../models/Donation');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Approve user
router.put('/users/:id/approve', verifyToken, async (req, res) => {
  try {
    const admin = await User.findById(req.userId);
    if (!admin.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

//Get all donations (admin)
router.get('/donations', verifyToken, async(req,res)=>{
    try{
        const admin = await User.findById(req.userId);
        if(!admin.isAdmin){
            return res.status(403).json({message: "Unauthorized"});
        }
        const donations = await Donation.find().populate('donor', 'username');
        res.json(donations);
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
})


router.get('/stats', verifyToken, async (req, res) => {
  try {
    const users = (await User.find()).length
    const donations = (await Donation.find()).length
    console.log(users, donations)
    res.json({ users, donations });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})

router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id})
    res.json({ userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = router;