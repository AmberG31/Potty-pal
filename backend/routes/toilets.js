const express = require("express");
const router = express.Router();

const ToiletsController = require("../controllers/toiletController");

router.post("/:id/likes", CommentsController.ToggleLike);

module.exports = router;
