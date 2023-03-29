require("dotenv").config();
require("../mongodb_helper");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const Review = require("../../models/review");
const Toilet = require("../../models/toilet");
const User = require("../../models/user");

let toilet;
let user;
let token;

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      iat: Math.floor(Date.now() / 1000),

      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    // Wrap in a template literal to ensure the value is read as a string
    `${process.env.JWT_SECRET}`
  );

describe("/toilet/review", () => {
  beforeAll(async () => {
    user = new User({
      username: "amb",
      email: "test@test.com",
      password: bcrypt.hashSync("12345678", bcrypt.genSaltSync()),
    });
    await user.save();

    toilet = new Toilet({
      name: "Waterloo-1",
      author: user.id,
    });
    await toilet.save();
    token = generateBackdatedToken(user.id);
  });

  beforeEach(async () => {
    await Review.deleteMany({});
  });

  afterAll(async () => {
    await Toilet.deleteMany({});
    await User.deleteMany({});
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post(`/toilets/${toilet.id}/review`)
        .set("Authorization", `Bearer ${token}`)
        .send({ clean: "3" });
      expect(response.status).toEqual(201);
    });
    test("creates a new review", async () => {
      await request(app)
        .post(`/toilets/${toilet.id}/review`)
        .set("Authorization", `Bearer ${token}`)
        .send({ clean: "3" });
      const review = await Review.find();
      expect(review.length).toEqual(1);
      expect(review[0].clean).toEqual(3);
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .post(`/toilets/${toilet.id}/review`)
        .set("Authorization", `Bearer ${token}`)
        .send({ clean: "3" });
      const newPayload = jwt.decode(
        response.body.token,
        process.env.JWT_SECRET
      );
      const originalPayload = jwt.decode(token, process.env.JWT_SECRET);
      expect(newPayload.exp > originalPayload.exp).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post(`/toilets/${toilet.id}/review`)
        .send({ clean: "3" });
      expect(response.status).toEqual(401);
    });
    test("a new reveiw is not created", async () => {
      await request(app)
        .post(`/toilets/${toilet.id}/review`)
        .send({ clean: "3" });
      const review = await Review.find();
      expect(review.length).toEqual(0);
    });

    test("a new token is not returned", async () => {
      const response = await request(app)
        .post(`/toilets/${toilet.id}/review`)
        .send({ clean: "3" });
      expect(response.body.token).toEqual(undefined);
    });
  });
});
