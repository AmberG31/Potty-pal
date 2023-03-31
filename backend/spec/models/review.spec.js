const mongoose = require("mongoose");

require("../mongodb_helper");
const Review = require("../../models/review");

describe("Review model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.reviews.drop(() => {
      done();
    });
  });

  it("cleanliness has a rating", () => {
    const review = new Review({ clean: 3 });
    expect(review.clean).toEqual(3);
  });

  it("can list all reviews", async () => {
    const reviews = await Review.find();
    expect(reviews).toEqual([]);
  });
});
