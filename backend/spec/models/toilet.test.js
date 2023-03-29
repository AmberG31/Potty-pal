const mongoose = require("mongoose");

require("../mongodb_helper");

const Toilet = require("../../models/toilet");

describe("Toilet model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.toilets.drop(() => {
      done();
    });
  });

  const toilet1 = new Toilet({
    name: "Toilet1",
    rating: 1,
  });

  const toilet2 = new Toilet({
    name: "Toilet2",
    rating: 2,
  });

  it("has a module", () => {
    expect(Toilet).toBeDefined();
  });

  it("has a name", () => {
    expect(toilet1.name).toEqual("Toilet1");
  });

  it("can list all toilets", async () => {
    try {
      const toilets = await Toilet.find();
      expect(toilets).toEqual([]);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
