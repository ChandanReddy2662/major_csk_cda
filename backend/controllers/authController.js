const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, username, age, email, password, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists (Change email and/or password)" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      name,
      username,
      age,
      email,
      password: hashedPassword,
      phonenumber: phoneNumber,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isApproved && !user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Account pending admin approval" });
    }

    // Generate JWT Token
    const signOutTime = 30 * 24 * 60 * 60 * 1000; // 30 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: signOutTime,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        isApproved: user.isApproved,
        email: user.email,
        socialScore: user.socialScore,
        phonenumber: user.phonenumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
