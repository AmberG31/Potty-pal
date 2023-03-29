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
    await collection.drop();
  } catch (error) {
    if (error.message === "ns not found") return;
    if (error.message.includes("a background operation is currently running"))
      return;
    console.log(error.message);
  }
};
describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await dropUsers();
  });
  describe("POST", () => {
    test("a user is created", async () => {
      await request(app).post("/users").send({
        email: "scarlett@email.com",
        password: "1234",
        username: "scarlett",
      });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("GET", () => {
    let user = new User({
      email: "scarlett@email.com",
      password: "1234",
      username: "scarlett"
    });
    test("get logged in Users"),async () => {
      const response = await request(app).get("/users")
      .set("Authorization", `Bearer ${token}`);
      .send({
        email: "scarlett@email.com",
        password: "1234",
        username: "scarlett",
      });
    }
  });
});
