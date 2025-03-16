// server/models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  age: { type: Number },
  phonenumber: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  socialScore: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', UserSchema);