const mongoose = require("mongoose");

const dbConfig = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.error("DB connection error:", error);
    });
};

module.exports = dbConfig;
