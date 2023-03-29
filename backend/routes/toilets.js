const express = require("express");

const router = express.Router();

const { getAllToilets, addNewToilet } = require("../controllers/toilets");

router.get("/", getAllToilets);
router.post("/", addNewToilet);

module.exports = router;
