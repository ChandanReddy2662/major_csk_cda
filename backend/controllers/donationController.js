const fs = require("fs");
const Donation = require("../models/Donation");
const User = require("../models/User");

// Create a donation
const createDonation = async (req, res) => {
  try {
    let imageFile = req.file;
    let image = null;

    if (imageFile) {
      const imageBuffer = fs.readFileSync(imageFile.path);
      image = imageBuffer.toString("base64");

      // Delete the uploaded file from the server
      fs.unlinkSync(imageFile.path);
    }

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

    // Update social score
    await User.findByIdAndUpdate(req.userId, { $inc: { socialScore: 1 } });

    res.status(201).json({ message: "Donation created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ isTaken: false }).populate("donor", "username");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get donations made by the user
const getDonationsMade = async (req, res) => {
  try {
    const donationsMade = await Donation.find({ donor: req.userId });
    res.json(donationsMade);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get donations received by the user
const getDonationsReceived = async (req, res) => {
  try {
    const donationsReceived = await Donation.find({ recipient: req.userId });
    res.json(donationsReceived);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific donation
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate("donor", "username");
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a donation (only by admin or donor)
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const user = await User.findById(req.userId);
    if (donation.donor.toString() !== req.userId && !user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update donation recipient
const updateDonationRecipient = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (donation.donor.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    donation.recipient = recipientId;
    donation.isTaken = true;
    await donation.save();

    res.json({ message: "Recipient updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationsMade,
  getDonationsReceived,
  getDonationById,
  deleteDonation,
  updateDonationRecipient,
};
