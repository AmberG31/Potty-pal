const Review = require("../models/review");

const getAllReviews = async (req, res) => {
  try {
    const { toiletId } = req.params;

    const reviews = await Review.find({ toiletId }).populate(
      "User",
      "username email"
    );

    // If no comments are found, return an error
    if (!reviews) {
      return res.status(404).json({ error: "No reviews added" });
    }

    const toiletReviews = reviews.map((review) => {
      return {
        id: review.id,
        content: review.content,
        author: review.author,
        createdAt: review.createdAt,
      };
    });
    return res.status(200).json({ toiletReviews });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const addReview = async (req, res) => {
  try {
    const { toiletId } = req.params;

    const toilet = await Toilet.find({ _id: toiletId });

    if (!toilet) {
      return res.status(404).json({ error: "Toilet not found" });
    }

    const review = new Review(req.body);
    // userId should come from middleweare but not from the body
    review.author = req.body.userId;
    await review.save();

    return res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllReviews, addReview };
