const User = require("../models/User");
const Donation = require("../models/Donation");

// ✅ Approve User
const approveUser = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Donations (Admin)
const getAllDonations = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const donations = await Donation.find().populate("donor", "username");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Statistics
const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const donations = await Donation.countDocuments();
    res.json({ users, donations });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get User By ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  approveUser,
  getAllDonations,
  getStats,
  getUserById,
};
