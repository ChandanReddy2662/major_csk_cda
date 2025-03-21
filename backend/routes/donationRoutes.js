const express = require("express");
const multer = require("multer");
const {
  createDonation,
  getAllDonations,
  getDonationsMade,
  getDonationsReceived,
  getDonationById,
  deleteDonation,
  updateDonationRecipient,
} = require("../controllers/donationController");
const {verifyToken} = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Configure image upload path

router.post("/", upload.single("image"), verifyToken, createDonation);
router.get("/", getAllDonations);
router.get("/made", verifyToken, getDonationsMade);
router.get("/received", verifyToken, getDonationsReceived);
router.get("/:id", getDonationById);
router.delete("/:id", verifyToken, deleteDonation);
router.put("/:id/recipient", verifyToken, updateDonationRecipient);

module.exports = router;
