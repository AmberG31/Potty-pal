const Toilet = require('../models/toilet');
const Address = require('../models/address');
const generateToken = require('../models/tokenGenerator');

const getAllToilets = async (req, res) => {
  const { userId } = req;
  try {
    const toilets = await Toilet.find()
      .sort({ createdAt: -1 })
      .populate([{ path: 'addedBy', model: 'User', select: 'username' }])
      .populate([{ path: 'reviews', model: 'Review' }]);

    // Doesn't generate token if userId not found
    if (userId === undefined) {
      return res.status(200).json({ toilets });
    }
    const newToken = await generateToken(userId);

    return res.status(200).json({ toilets, token: newToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addNewToilet = async (req, res) => {
  try {
    const { name, accessible, babyChanging, price, address, photos } = req.body;
    const addressRecord = await Address.create(address);
    const { userId } = req;
    const toilet = await new Toilet({
      name,
      accessible,
      babyChanging,
      price,
      address: addressRecord.id,
      addedBy: userId,
      photos,
    });
    toilet.addedBy = userId;
    await toilet.save();

    // Generate a new token
    const token = await generateToken(userId);
    res.status(201).json({ toilet, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getToiletById = async (req, res) => {
  const { userId } = req;
  try {
    const toilet = await Toilet.findById(req.params.id)
      .populate([
        { path: 'address', model: 'Address' },
        { path: 'addedBy', model: 'User', select: 'username' },
        {
          path: 'reviews',
          model: 'Review',
          populate: {
            path: 'author',
            model: 'User',
            select: 'username',
          },
        },
      ])
      .lean();
    if (!toilet || toilet.length === 0) {
      throw new Error('Toilet not found');
    }

    // Doesn't generate token if userId not found
    if (userId === undefined) {
      return res.status(200).json({ toilet });
    }

    const newToken = await generateToken(req.userId);
    return res.status(200).json({ toilet, token: newToken });
  } catch (error) {
    if (error.message === 'Toilet not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllToilets, addNewToilet, getToiletById };
