const express = require("express");
const { getUserProfile, getAllUsers, updateUserProfile } = require("../controllers/userController");
const {verifyToken} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.get("/", verifyToken, getAllUsers);
router.put("/update", verifyToken, updateUserProfile);

module.exports = router;
