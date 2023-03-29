const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../../app");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/tokens", () => {
  beforeEach(async () => {
    const user = await new User({
      name: "test user",
      username: "tester",
      email: "test@email.com",
      password: bcrypt.hashSync("12345", bcrypt.genSaltSync()),
    });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("a token is returned when a user logs in with username and password", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ username: "tester", password: "12345" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("Login Successful");
  });

  test("a token is returned when a user logins in with email and password", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ email: "test@email.com", password: "12345" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("Login Successful");
  });

  test("a token is returned when a user logins in with email, username and password", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ username: "tester", email: "test@email.com", password: "12345" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("Login Successful");
  });

  test("a token is not returned when the password is invalid", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ username: "tester", password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Incorrect password");
  });

  test("a token is not returned when the email is invalid", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ email: "notest@email.com", password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual(
      "No account with this username or email"
    );
  });

  test("a token is not returned when the username is not valid", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ username: "notester", password: "12345" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual(
      "No account with this username or email"
    );
  });
});
