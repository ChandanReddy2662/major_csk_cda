const express = require("express");
const {
  getChatUsersByDonation,
  getChatsBetweenDonorAndUser,
  getUserNotifications,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/users/:donationId", getChatUsersByDonation);
router.get("/notifications/:userId", getUserNotifications);
router.get("/:donationId/:userId", getChatsBetweenDonorAndUser);

module.exports = router;
