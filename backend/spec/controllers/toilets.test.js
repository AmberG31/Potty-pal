const request = require("supertest");
const app = require("../../app");

require("../mongodb_helper");

const Toilet = require("../../models/toilet");
const Address = require("../../models/address");
const User = require("../../models/user");

let toilet;
let address;
let user;

describe("/toilets", () => {
  beforeAll(async () => {
    user = new User({
      username: "test",
      email: "test@test.com",
      password: "test123",
    });
    await user.save();

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
        const response = await request(app).get("/toilets");
        expect(response.status).toBe(200);
      });

      test("it should return an empty array of the toilet", async () => {
        const response = await request(app).get("/toilets");
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
        const response = await request(app).get("/toilets");
        expect(response.status).toBe(200);
      });

      test("it should return the instance of toilet", async () => {
        const response = await request(app).get("/toilets");
        const expectedToilet = await response.body.toilets[0];
        expect(expectedToilet.name).toBe("Toilet1");
        expect(expectedToilet.accessible).toBe(true);
        expect(expectedToilet.babyChanging).toBe(true);
        expect(expectedToilet.addedBy.username).toBe(user.username);
        expect(expectedToilet.address.postcode).toBe(address.postcode);
      });
    });
  });

  describe("POST /toilets", () => {
    beforeAll(() => {});

    describe("When the request body is valid", () => {
      test("it should return a 201 response", async () => {
        const newToilet = {
          name: "Toilet1",
          accessible: true,
          babyChanging: true,
          price: 0.5,
          addedBy: user._id,
          address: address._id,
        };
        const response = await request(app).post("/toilets").send(newToilet);
        expect(response.status).toBe(201);
      });

      // test("it should create a new toilet", async () => {
      //   const newToilet = {
      //     name: "Toilet1",
      //     accessible: true,
      //     babyChanging: true,
      //     price: 0.5,
      //     addedBy: user._id,
      //     address: address._id,
      //   };
      //   const response = await request(app).post("/toilets").send(newToilet);
      //   const toilets = await Toilet.find();
      //   expect(toilets.length).toBe(1);
      // });
    });
  });
});
