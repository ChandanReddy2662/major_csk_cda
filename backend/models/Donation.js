// server/models/Donation.js
const mongoose = require('mongoose');
const DonationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  location: { type: String },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isTaken: { type: Boolean, default: false },
});
module.exports = mongoose.model('Donation', DonationSchema);