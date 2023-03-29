const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("../mongodb_helper");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

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
});
