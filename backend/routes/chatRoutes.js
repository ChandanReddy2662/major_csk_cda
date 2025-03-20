// server/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const Notification = require('../models/Notification')

// Get all users who have chatted within a specific donation
router.get('/users/:donationId', async (req, res) => {
  try {
    const { donationId } = req.params;
    const chat = await Chat.findOne({ donationId: donationId }); // Use findOne instead of find
    if (!chat) {
      return res.json([]); // Return empty array if chat is not found
    }
    const usersPromises = chat.users.map(async element => {
      const user = await User.findOne({ _id: element.userId });
      return { userId: user._id, username: user.username, chatId: element.chatId };
    });

    const users = await Promise.all(usersPromises);

    console.log(users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({createdAt: -1})
    console.log("line 63", notifications, req.params.userId)
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
// Get all chats between a specific donor and user within a donation
router.get('/:donationId/:userId', async (req, res) => {
  
  try {
    const { donationId, userId } = req.params;
    console.log(req.params)

    const chat = await Chat.findOne({ donationId: donationId });
    if(chat){
      const filteredChat = chat.users.filter(user => user.userId.toString() === userId)[0]
      if (!filteredChat) {
        return res.json([])
      }

      const chatInfo = chat.messages.filter(message => {
        return message.chatId === filteredChat.chatId
      })

      return res.json(chatInfo);
    }
    return res.json([])

  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;