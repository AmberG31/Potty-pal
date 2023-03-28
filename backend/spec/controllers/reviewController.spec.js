require("../mongodb_helper");
const request = require("supertest");
const app = require("../../app");
const Review = require("../../models/review");
const Toilet = require("../../models/toilet");

let toilet;

describe("/toilet/review", () => {
  beforeAll(async () => {
    toilet = new Toilet({
      name: "Waterloo-1",
      author: user.id,
    });
    await toilet.save();
  });

  beforeEach(async () => {
    await Review.deleteMany({});
  });

  afterAll(async () => {
    await Toilet.deleteMany({});
    await Review.deleteMany({});
  });
});
