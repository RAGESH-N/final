const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  shopOwnerName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  fssaiCode: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bankAccountNumber: { type: String, required: true },
  password: { type: String, required: true },
  mailId: { type: String, required: true },
  city: { type: String, required: true },           // <-- NEW FIELD
  geoLocation: { type: String, required: true },
});

module.exports = mongoose.model('Decision', decisionSchema);