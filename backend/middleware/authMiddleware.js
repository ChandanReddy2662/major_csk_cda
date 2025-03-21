const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        // Fetch the user and check if admin
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; // Store user info for later use
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid token" });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        // Fetch the user and check if admin
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!user.isAdmin)
            return res.status(403).json({ message: "Forbidden" });
        req.user = user; // Store user info for later use
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = {verifyToken, verifyAdmin};
