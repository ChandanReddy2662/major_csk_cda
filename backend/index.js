const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const socketManager = require('./socket/socketManager');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ Properly configure CORS
app.use(cors({
    origin: process.env.FRONTEND_URI, // Update with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Allow cookies & authorization headers
}));

// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chats', chatRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

socketManager(server); // Initialize Socket.IO
