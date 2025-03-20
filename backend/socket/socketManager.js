const socketio = require('socket.io');
const Chat = require('../models/Chat');
const Notification = require("../models/Notification");
const Donation = require('../models/Donation');
const SocketId = require('../models/SocketId')



module.exports = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    },
  });

  const userSockets = {};

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinChat', ({ chatId }) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });
    socket.on('sendMessage', async ({ donationId, chatId, message, userId }) => {
      try {
        // console.log(userId, chatId, donationId, message);
    
        // Validate chatId *before* any other operations
        if (!chatId || typeof chatId !== 'string' || chatId.trim() === '') {
          console.error('Invalid chatId received:', chatId);
          return; // Stop processing if chatId is invalid
        }
    
        let chat = await Chat.findOne({ donationId: donationId });
        // console.log(chat);
    
        const ids = chatId.split('-');
        const donorId = ids[ids.length - 1];
    
        if (!chat) {
          chat = new Chat({
            donationId: donationId,
            messages: [],
            users: [],
          });
        }
        // console.log(chat);
    
        const newMessage = {
          sender: userId,
          chatId: chatId,
          content: message,
          timestamp: new Date(),
        };
        chat.messages.push(newMessage);
    
        const userExists = chat.users.some(
          (user) => user.userId.toString() === userId.toString() && user.chatId === chatId
        );
        // console.log(userExists)
        if (!userExists && !(donorId === userId)) {
          chat.users.push({ userId: userId, chatId: chatId });
        }
        await chat.save();
        // console.log(chat);
        io.to(chatId).emit('newMessage', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Track user for notifications
    socket.on("joinNotifications", async ({ userId }) => {
      userSockets[userId] = socket.id;

      const socketId = await SocketId.findOne({userId: userId})
      if(!socketId){
        const newSocket = new SocketId({userId: userId, socketId: socket.id})
        newSocket.save()
      }
      else{
        SocketId.updateOne({userId: userId}, {socketId: socket.id})
      }


      console.log(`User ${userId} connected for notifications`);
    });

    // **Handle Notifications**
    socket.on("sendNotification", async ({ senderId, recipientId, message, donationId }) => {
      try {
        console.log(message, recipientId, senderId  )
        const newNotification = new Notification({
          userId: recipientId,
          message: message,
          senderId: senderId,
        });
        const donation = await Donation.findOne({_id: donationId})
        const donationTitle = donation.title
        newNotification.message += ' from donation: ' + donationTitle

        await newNotification.save();
        console.log(userSockets)
        // If recipient is online, send real-time notification
        // const recipientSockId = await SocketId.findOne({userId: recipientId})
        const recipientSockId = userSockets[recipientId]
        if (recipientSockId) {
          console.log('sending', recipientSockId)
          io.to(recipientSockId).emit("newNotification", newNotification);
        }
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    // **Mark notifications as read**
    socket.on("markNotificationsAsRead", async ({ userId }) => {
      try {
        await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};