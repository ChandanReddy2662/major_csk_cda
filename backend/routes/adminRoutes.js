const express = require("express");
const router = express.Router();
const {verifyToken: verifyAdmin} = require("../middleware/authMiddleware");
const {
  approveUser,
  getAllDonations,
  getStats,
  getUserById,
} = require("../controllers/adminController");

// ✅ Approve User (Admin)
router.put("/users/:id/approve", verifyAdmin, approveUser);

// ✅ Get All Donations (Admin)
router.get("/donations", verifyAdmin, getAllDonations);

// ✅ Get Statistics (Users & Donations)
router.get("/stats", verifyAdmin, getStats);

// ✅ Get User by ID
router.get("/user/:id", verifyAdmin, getUserById);

module.exports = router;
