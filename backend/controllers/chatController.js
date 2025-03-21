const Chat = require("../models/Chat");
const User = require("../models/User");
const Notification = require("../models/Notification");

// Get all users who have chatted within a specific donation
const getChatUsersByDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const chat = await Chat.findOne({ donationId });

    if (!chat) {
      return res.json([]); // Return empty array if no chat found
    }

    const usersPromises = chat.users.map(async (element) => {
      const user = await User.findOne({ _id: element.userId });
      return { userId: user._id, username: user.username, chatId: element.chatId };
    });

    const users = await Promise.all(usersPromises);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all chats between a specific donor and user within a donation
const getChatsBetweenDonorAndUser = async (req, res) => {
  try {
    const { donationId, userId } = req.params;
    const chat = await Chat.findOne({ donationId });

    if (chat) {
      const filteredChat = chat.users.find((user) => user.userId.toString() === userId);
      if (!filteredChat) {
        return res.json([]);
      }

      const chatInfo = chat.messages.filter((message) => message.chatId === filteredChat.chatId);
      return res.json(chatInfo);
    }
    
    return res.json([]);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all notifications for a specific user
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

module.exports = {
  getChatUsersByDonation,
  getChatsBetweenDonorAndUser,
  getUserNotifications,
};
