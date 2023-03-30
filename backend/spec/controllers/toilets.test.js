const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("../mongodb_helper");

const Toilet = require("../../models/toilet");
const Address = require("../../models/address");
const User = require("../../models/user");

let token;
let toilet;
let address;
let user;

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      // Set the JWT token to be issued 5 minutes ago
      // iat = issued at
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      // exp = expires
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    // Wrap in a template literal to ensure the value is read as a string
    `${process.env.JWT_SECRET}`
  );

describe("/toilets", () => {
  beforeAll(async () => {
    user = new User({
      username: "test",
      email: "test@test.com",
      password: "test123",
    });
    await user.save();
    token = generateBackdatedToken(user.id);

    address = new Address({
      address: "123 test",
      city: "test city",
      postcode: "te5 5te",
    });
    await address.save();
  });

  beforeEach(async () => {
    await Toilet.deleteMany();
  });

  afterAll(async () => {
    await User.deleteMany();
    await Address.deleteMany();
  });

  describe("GET /toilets", () => {
    describe("When no toilets are added", () => {
      test("it should return a 200 response", async () => {
        const response = await request(app)
          .get("/toilets")
          .set("Authorization", `Bearer ${token}`)
          .send({ token });
        expect(response.status).toBe(200);
      });

      test("it should return an empty array of the toilet", async () => {
        const response = await request(app)
          .get("/toilets")
          .set("Authorization", `Bearer ${token}`)
          .send({ token });
        expect(response.body.toilets).toBeDefined();
      });
    });

    describe("When toilets are added", () => {
      beforeEach(async () => {
        toilet = new Toilet({
          name: "Toilet1",
          accessible: true,
          babyChanging: true,
          price: 0.5,
          addedBy: user._id,
          address: address._id,
        });
        await toilet.save();
      });

      test("it should return a 200 response", async () => {
        const response = await request(app)
          .get("/toilets")
          .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
      });

      test("it should return the instance of toilet", async () => {
        const response = await request(app)
          .get("/toilets")
          .set("Authorization", `Bearer ${token}`);
        const expectedToilet = await response.body.toilets[0];
        expect(expectedToilet.name).toBe("Toilet1");
        expect(expectedToilet.accessible).toBe(true);
        expect(expectedToilet.babyChanging).toBe(true);
        expect(expectedToilet.addedBy.username).toBe(user.username);
      });
    });

    describe("GET /toilets/:id", () => {
      describe("When the toilet exists", () => {
        beforeEach(async () => {
          toilet = new Toilet({
            name: "Toilet1",
            accessible: true,
            babyChanging: true,
            price: 0.5,
            addedBy: user._id,
            address: address._id,
          });
          await toilet.save();
        });

        test("it should return a 200 response", async () => {
          const response = await request(app)
            .get(`/toilets/${toilet._id}`)
            .set("Authorization", `Bearer ${token}`);
          expect(response.status).toBe(200);
        });

        test("it should return the instance of toilet", async () => {
          const response = await request(app)
            .get(`/toilets/${toilet._id}`)
            .set("Authorization", `Bearer ${token}`);
          const expectedToilet = await response.body.toilet;
          expect(expectedToilet.name).toBe("Toilet1");
          expect(expectedToilet.accessible).toBe(true);
          expect(expectedToilet.babyChanging).toBe(true);
          expect(expectedToilet.addedBy.username).toBe(user.username);
        });
      });

      describe("When the toilet does not exist", () => {
        test("it should return a 404 response", async () => {
          const response = await request(app)
            .get(`/toilets/64261347059e9ae1f387ff33`)
            .set("Authorization", `Bearer ${token}`);
          expect(response.status).toBe(404);
        });
      });
    });
  });

  describe("POST /toilets", () => {
    beforeEach(async () => {
      await Address.deleteMany();
    });

    describe("When the request body is valid", () => {
      test("it should return a 201 response", async () => {
        const newToilet = {
          name: "Toilet1",
          accessible: true,
          babyChanging: true,
          price: 0.5,
          addedBy: user._id,
        };
        const response = await request(app)
          .post("/toilets")
          .set("Authorization", `Bearer ${token}`)
          .send(newToilet);
        expect(response.status).toBe(201);
      });

      test("it should create a new toilet", async () => {
        const newToilet = {
          name: "Toilet1",
          accessible: true,
          babyChanging: true,
          price: 0.5,
          addedBy: user._id,
        };
        const response = await request(app)
          .post("/toilets")
          .set("Authorization", `Bearer ${token}`)
          .send(newToilet);
        const toilets = await Toilet.find();
        expect(toilets.length).toBe(1);
      });
    });
  });
});
