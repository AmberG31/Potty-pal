const mongoose = require("mongoose");

// mongoose.set("findOneAndUpdate", false);

const ToiletSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    accessible: { type: Boolean },
    babyChanging: { type: Boolean },
    price: { type: mongoose.Decimal128 },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const Toilet = mongoose.model("Toilet", ToiletSchema);

module.exports = Toilet;
