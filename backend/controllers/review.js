const Review = require("../models/review");
const Toilet = require("../models/toilet");
const generateToken = require("../models/tokenGenerator");

const getAllReviews = async (req, res) => {
  try {
    const { toiletId } = req.params;

    const reviews = await Review.find({ toiletId })
      .sort([["createdAt", -1]])
      .populate([{ path: "author", model: "User", select: "username" }]);

    const token = await generateToken(req.userId);

    // If no comments are found, return an error
    if (!reviews) {
      return res.status(404).json({ error: "No reviews added", token });
    }

    const toiletReviews = reviews.map((review) => {
      return {
        id: review.id,
        clean: review.clean,
        content: review.content,
        author: review.author,
        createdAt: review.createdAt,
      };
    });
    return res.status(200).json({ reviews: toiletReviews, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const addReview = async (req, res) => {
  try {
    const { toiletId } = req.params;

    const toilet = await Toilet.find({ _id: toiletId });
    const token = await generateToken(req.userId);

    if (!toilet) {
      return res.status(404).json({ error: "Toilet not found", token });
    }

    const review = new Review(req.body);
    // userId should come from middleweare but not from the body
    review.toiletId = toiletId;
    review.author = req.userId;
    await review.save();
    return res.status(201).json({ message: "Successfully created", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllReviews, addReview };
