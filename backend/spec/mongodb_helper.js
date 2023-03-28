const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect("mongodb://0.0.0.0/potty-pal-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {});
});

afterAll(async () => {
  await mongoose.connection.close(true);
});
