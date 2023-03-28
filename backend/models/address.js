const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const AddressSchema = new mongoose.Schema({
  address: { type: string },
  city: { type: string },
  postcode: { type: string },
  toiletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Toilet",
    immutable: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
