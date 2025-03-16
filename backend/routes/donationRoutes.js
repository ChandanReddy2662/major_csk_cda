// server/routes/donation.js
const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs')
const upload = multer({ dest: 'uploads/' }); // configure image upload path

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

// Create a donation
router.post('/', upload.single('image'), verifyToken, async (req, res) => {
  try {
    let imageFile = req.file
    let image = null;
    
    if (imageFile) {
      // Convert image file to base64 string
      const imageBuffer = fs.readFileSync(imageFile.path);
      image = imageBuffer.toString('base64');

      // Delete the uploaded file from the server
      fs.unlinkSync(imageFile.path);
    }
    console.log(req.userId)
    const { title, description, category, email, phoneNumber, location } = req.body;
    const donation = new Donation({
      title,
      description,
      category,
      image: image ? `data:${imageFile.mimetype};base64,${image}` : null,
      email,
      phoneNumber,
      location,
      donor: req.userId,
    });
    await donation.save();

    //Update social score
    await User.findByIdAndUpdate(req.userId, {$inc: {socialScore: 1}});

    res.status(201).json({ message: 'Donation created successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find({isTaken: false}).populate('donor', 'username');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/made', verifyToken, async (req, res) => {
  console.log(req)
  try {
    const donatinsMade = await Donation.find({donor: req.userId})
    console.log(donatinsMade)
    res.json(donatinsMade)
  } catch (error) {
    console.log(error)
  }
})

router.get('/received', verifyToken, async (req, res) => {
  console.log(req)
  try {
    const donatinsMade = await Donation.find({recipient: req.userId})
    console.log(donatinsMade)
    res.json(donatinsMade)
  } catch (error) {
    console.log(error)
  }
})

// Get a specific donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor', 'username');
    // console.log(donation)
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a donation (only by admin or donor)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    const user = await User.findById(req.userId);
    if (donation.donor.toString() !== req.userId && !user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

//Update donation recipient
router.put('/:id/recipient', verifyToken, async (req,res)=>{
    try{
        const {recipientId} = req.body;
        const donation = await Donation.findById(req.params.id);
        const user = await User.findById(req.userId);

        if(donation.donor.toString() !== req.userId){
            return res.status(403).json({message: "Unauthorized"});
        }
        donation.recipient = recipientId;
        donation.isTaken = true;
        await donation.save();
        res.json({message: "Recipient updated successfully"});

    }catch(error){
        res.status(500).json({message: "Server error"});
    }
})


module.exports = router;