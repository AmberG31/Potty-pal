const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("../mongodb_helper");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,

      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    // Wrap in a template literal to ensure the value is read as a string
    `${process.env.JWT_SECRET}`
  );

const dropUsers = async () => {
  const collection = mongoose.connection.collections.users;
  try {
    await collection.drop({});
  } catch (error) {
    if (error.message === "ns not found") return;
    if (error.message.includes("a background operation is currently running"))
      return;
  }
};

describe("/users", () => {
  let users;
  let newUser;
  let token;

  // beforeEach(async () => {
  //   await User.deleteMany({});
  // });

  afterAll(async () => {
    await User.deleteMany({});
    await dropUsers();
  });

  describe("POST", () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    describe("does not create a new user", () => {
      test("when a username is not provided", async () => {
        const response = await request(app)
          .post("/users")
          .send({ email: "skye@email.com", password: "1234" });
        users = await User.find();
        expect(response.status).toEqual(400);
      });
      test("when a name is not provided", async () => {
        const response = await request(app)
          .post("/users")
          .send({ email: "skye@email.com", password: "1234" });
        users = await User.find();
        expect(response.status).toEqual(400);
      });
      test("when a username is not provided", async () => {
        const response = await request(app)
          .post("/users")
          .send({ email: "skye@email.com", password: "1234" });
        users = await User.find();
        expect(response.status).toEqual(400);
      });
    });
    test("does not create a user when a username and password are not provided", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });
      expect(response.status).toEqual(400);
    });

    describe("When all the fields are provided", () => {
      afterEach(async () => {
        await User.deleteMany();
      });

      test("returns a 201 status code", async () => {
        const response = await request(app).post("/users").send({
          email: "scarlett@email.com",
          password: "1234",
          username: "scarlett",
        });
        token = generateBackdatedToken(response.body.user._id);
        expect(response.status).toEqual(201);
      });

      test("returns a new token", async () => {
        const response = await request(app).post("/users").send({
          email: "scarlett@email.com",
          password: "1234",
          username: "scarlett",
        });
        expect(response.body.token).toBeDefined();
      });

      test("a new user is created", async () => {
        const response = await request(app).post("/users").send({
          email: "scarlett@email.com",
          password: "1234",
          username: "scarlett",
        });
        users = await User.find();
        expect(users.length).toEqual(1);
      });
    });
  });

  describe("GET", () => {
    test("get details for logged in user", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      console.log(token);
      expect(response.status).toBe(200);
    });

    // test('returns error if no token provided', async () => {
    //   user = User({
    //     email: "scarlett@email.com",
    //     password: "1243",
    //     username: "scar"
    //   })
    //   const response = await request(app)
    //   .get("/users")
    //   .set("Authorization", `Bearer `)
    //   expect(response.status).toBe(401)
    // });
  });
});
