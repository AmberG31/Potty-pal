const Review = require('../models/review');
const Toilet = require('../models/toilet');
const generateToken = require('../models/tokenGenerator');

const addReview = async (req, res) => {
  try {
    const { id } = req.params;

    const toilet = await Toilet.find({ _id: id });
    const token = await generateToken(req.userId);

    if (!toilet) {
      return res.status(404).json({ error: 'Toilet not found', token });
    }

    const review = new Review(req.body);
    // userId should come from middleweare but not from the body
    review.toiletId = id;
    review.author = req.userId;
    await review.save();
    await Toilet.findOneAndUpdate(
      { _id: id },
      { $push: { reviews: review._id } }
    );
    return res.status(201).json({ message: 'Successfully created', token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview };
