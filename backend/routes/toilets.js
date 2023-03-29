const express = require("express");

const router = express.Router();

const { getAllToilets, addNewToilet } = require("../controllers/toilets");
const { getAllReviews, addReview } = require("../controllers/reviewController");

router.get("/", getAllToilets);
router.post("/", addNewToilet);
router.get("/:toiletId/review", getAllReviews);
router.post("/:toiletId/review", addReview);

module.exports = router;
