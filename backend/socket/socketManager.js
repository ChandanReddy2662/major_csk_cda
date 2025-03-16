const socketio = require('socket.io');
const Chat = require('../models/Chat');

module.exports = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinChat', ({ chatId }) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });
    socket.on('sendMessage', async ({ donationId, chatId, message, userId }) => {
      try {
        console.log(userId, chatId, donationId, message);
    
        // Validate chatId *before* any other operations
        if (!chatId || typeof chatId !== 'string' || chatId.trim() === '') {
          console.error('Invalid chatId received:', chatId);
          return; // Stop processing if chatId is invalid
        }
    
        let chat = await Chat.findOne({ donationId: donationId });
        console.log(chat);
    
        const ids = chatId.split('-');
        const donorId = ids[ids.length - 1];
    
        if (!chat) {
          chat = new Chat({
            donationId: donationId,
            messages: [],
            users: [],
          });
        }
        console.log(chat);
    
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
        console.log(userExists)
        if (!userExists && !(donorId === userId)) {
          chat.users.push({ userId: userId, chatId: chatId });
        }
        console.log(chat);
        await chat.save();
        io.to(chatId).emit('newMessage', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};