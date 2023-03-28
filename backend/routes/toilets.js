const express = require("express");

const router = express.Router();

const { getAllToilets } = require("../controllers/toilets");

router.get("/", getAllToilets);

module.exports = router;
