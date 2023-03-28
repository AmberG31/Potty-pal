const Toilet = require("../models/toilet");
const Address = require("../models/address");
const User = require("../models/user");
const Review = require("../models/review");

const getAllToilets = async (req, res) => {
  try {
    const toilets = await Toilet.find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "address", model: "Address" },
        { path: "addedBy", model: "User" },
        {
          path: "reviews",
          model: "Review",
          populate: {
            path: "user",
            model: "User",
            select: "name",
          },
        },
      ]);
    res.status(200).json({ message: "OK", toilets });
  } catch (error) {
    throw error;
  }
};

const addNewToilet = async (req, res) => {
  try {
    const { name, accessible, babyChanging, price, address, addedBy } =
      req.body;
    const toilet = await new Toilet({
      name: name,
      accessible: accessible,
      babyChanging: babyChanging,
      price: price,
      address: address,
      addedBy: addedBy,
    });
    await toilet.save();
    res.status(201).json({ message: "OK" });
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllToilets, addNewToilet };
