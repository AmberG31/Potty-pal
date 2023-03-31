const express = require('express');

const router = express.Router();

const {
  getAllToilets,
  addNewToilet,
  getToiletById,
} = require('../controllers/toilets');

const { addReview } = require('../controllers/review');

router.get('/', getAllToilets);
router.post('/', addNewToilet);
router.get('/:id', getToiletById);
router.post('/:id/review', addReview);

module.exports = router;
