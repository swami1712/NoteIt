const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

module.exports = mongoose;
