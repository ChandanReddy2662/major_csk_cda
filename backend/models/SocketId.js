
const mongoose = require('mongoose');
const socketManager = require('../socket/socketManager');

const SocketId = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
    socketId: {type: String, required: true }
})

module.exports = mongoose.model('SocketId', SocketId);