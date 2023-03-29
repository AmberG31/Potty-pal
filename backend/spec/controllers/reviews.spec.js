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

  describe("GET, when token is present", () => {
    beforeEach(async () => {
      const review1 = new Review({
        clean: "3",
        content: "No toilet paper",
        toiletId: toilet.id,
        author: user.id,
      });
      const review2 = new Review({
        clean: "5",
        content: "Spotless",
        toiletId: toilet.id,
        author: user.id,
      });
      await review1.save();
      await review2.save();
    });

    afterEach(async () => {
      await Review.deleteMany({});
    });

    test("returns every review for a toilet", async () => {
      const response = await request(app)
        .get(`/toilets/${toilet.id}/review`)
        .query({ toiletId: toilet.id })
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      const reviews = response.body.reviews.map((review) => review.clean);
      expect(reviews).toEqual([3, 5]);
    });

    test("the response code is 200", async () => {
      const response = await request(app)
        .get(`/toilets/${toilet.id}/review`)
        .query({ toiletId: toilet.id })
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .get(`/toilets/${toilet.id}/review`)
        .query({ toiletId: toilet.id })
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      const newPayload = jwt.decode(
        response.body.token,
        process.env.JWT_SECRET
      );
      const originalPayload = jwt.decode(token, process.env.JWT_SECRET);
      expect(newPayload.exp > originalPayload.exp).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    beforeEach(async () => {
      const review1 = new Review({
        clean: "3",
        content: "No toilet paper",
        toiletId: toilet.id,
        author: user.id,
      });
      const review2 = new Review({
        clean: "5",
        content: "Spotless",
        toiletId: toilet.id,
        author: user.id,
      });
      await review1.save();
      await review2.save();
    });

    afterEach(async () => {
      await Review.deleteMany({});
    });

    afterAll(async () => {
      await Toilet.deleteMany({});
      await User.deleteMany({});
      await Review.deleteMany({});
    });

    test("returns no reviews", async () => {
      const response = await request(app).get(`/toilets/${toilet.id}/review`);
      expect(response.body.reviews).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      const response = await request(app).get(`/toilets/${toilet.id}/review`);
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      const response = await request(app).get(`/toilets/${toilet.id}/review`);
      expect(response.body.token).toEqual(undefined);
    });
  });
});
