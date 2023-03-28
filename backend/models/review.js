const mongoose = require("mongoose");

// mongoose.set("useFindAndModify", false);

const ReviewSchema = new mongoose.Schema(
  {
    clean: { type: Number },
    content: { type: String },
    toiletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Toilet",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
