// server/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', verifyToken, async (req,res)=>{
    try{
        const user = await User.findById(req.userId);
        if(!user.isAdmin){
            return res.status(403).json({message: "Unauthorized"});
        }
        const users = await User.find().select("-password");
        res.json(users);
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
})


router.put('/update', verifyToken, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({_id: req.userId}, req.body)
    await user.save()
    console.log(user)
    res.json({
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin, 
        isApproved: user.isApproved, email: user.email, socialScore: user.socialScore, phonenumber: user.phonenumber }  
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;