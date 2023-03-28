const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const ToiletSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    accessible: { type: Boolean },
    babyChanging: { type: Boolean },
    price: { type: double },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
  },
  { timestamps: true }
);

const Toilet = mongoose.model("Toilet", ToiletSchema);

module.exports = Toilet;
