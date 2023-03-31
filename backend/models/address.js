const mongoose = require('mongoose');

// mongoose.set("useFindAndModify", false);

const AddressSchema = new mongoose.Schema({
  address: { type: String },
  city: { type: String },
  postcode: { type: String },
  geolocation: {
    type: Array,
    of: Number,
  },
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
