const express = require('express');

const router = express.Router();

const {
  getAllToilets,
  addNewToilet,
  getToiletById,
} = require('../controllers/toilets');

const { getAllReviews, addReview } = require('../controllers/review');

router.get('/:id', getToiletById);
router.get('/', getAllToilets);
router.post('/', addNewToilet);
router.get('/:toiletId/review', getAllReviews);
router.post('/:toiletId/review', addReview);

module.exports = router;
