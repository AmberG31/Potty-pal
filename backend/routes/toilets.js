const express = require('express');

const router = express.Router();

const {
  getAllToilets,
  addNewToilet,
  getToiletById,
} = require('../controllers/toilets');

const { addReview } = require('../controllers/review');
const tokenChecker = require('../middleware/tokenChecker');

router.get('/', getAllToilets);
router.post('/', addNewToilet);
router.get('/:id', getToiletById);
router.post('/:id/review', tokenChecker, addReview);

module.exports = router;
