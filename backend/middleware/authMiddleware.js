import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const user = await User.findById(decoded.id);

        if (!user) return res.status(401).json({ message: "User not found" });
        if (user.status !== "approved") return res.status(403).json({ message: "User not approved yet" });

        req.user = user; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    try {
        await verifyUser(req, res, async () => {
            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "Access denied. Admins only." });
            }
            next();
        });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default authMiddleware;
