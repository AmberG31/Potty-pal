const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const ReviewSchema = new mongoose.Schema(
  {
    clean: { type: integer },
    content: { type: string },
    toiletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Toilet",
      required: true,
    },
    reviewAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
