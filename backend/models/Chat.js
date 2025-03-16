// server/models/Chat.js
const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
  donationId: {type: String, required: true},
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      chatId: {type: String},
      content: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  users: [{userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, chatId: {type: String}}],
});
module.exports = mongoose.model('Chat', ChatSchema);