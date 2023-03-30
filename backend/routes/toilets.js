const express = require("express");

const router = express.Router();

const {
  getAllToilets,
  addNewToilet,
  getToiletById,
} = require("../controllers/toilets");

router.get("/:id", getToiletById);
router.get("/", getAllToilets);
router.post("/", addNewToilet);

module.exports = router;
