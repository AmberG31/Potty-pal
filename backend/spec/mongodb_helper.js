const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect("mongodb://0.0.0.0/potty-pal-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  afterAll(async () => {
    await mongoose.connection.close(true);
  });

  beforeEach(async () => {
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
  });
});
