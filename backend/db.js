const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_DB_CONNECTION_STRING;

try {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("[mongodb]: Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("[mongodb]: Error connecting to MongoDB:", error);
    process.exit(1);
  });
} catch (error) {
  console.error("[mongodb]: Error connecting to MongoDB:", error);
  process.exit(1);
}

module.exports = mongoose.connection;
