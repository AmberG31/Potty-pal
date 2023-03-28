const express = require("express");

const toiletRouter = express.Router();

const { getAllReviews, addReview } = require("../controllers/reviewController");

// http://localhost:8080/toilets/:toiletId/review

// http://localhost:8080/toilets/32/reviews

toiletRouter.get("/:toiletId/review", getAllReviews);
toiletRouter.post("/:toiletId/review", addReview);

module.exports = toiletRouter;
