const Toilet = require("../models/toilet");
const Address = require("../models/address");
const User = require("../models/user");
const Review = require("../models/review");
const generateToken = require("../models/tokenGenerator");
const tokenChecker = require("../middleware/tokenChecker");

const getAllToilets = async (req, res) => {
  try {
    const userId = req.userId;
    const toilets = await Toilet.find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "address", model: "Address" },
        { path: "addedBy", model: "User", select: "username" },
        {
          path: "reviews",
          model: "Review",
          populate: {
            path: "user",
            model: "User",
            select: "username",
          },
        },
      ]);
    const newToken = await generateToken(req.userId);

    res.status(200).json({ toilets, newToken });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
};

const addNewToilet = async (req, res) => {
  try {
    const { name, accessible, babyChanging, price, address } = req.body;
    const userId = req.userId;
    const toilet = await new Toilet({
      name,
      accessible,
      babyChanging,
      price,
      address,
      addedBy: userId,
    });
    toilet.addedBy = userId;
    await toilet.save();

    // Generate a new token
    const token = await generateToken(userId);
    res.status(201).json({ toilet, token });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
};

module.exports = { getAllToilets, addNewToilet };
