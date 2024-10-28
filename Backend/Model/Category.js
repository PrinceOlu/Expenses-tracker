const mongoose = require("mongoose");

// create schema
const categorySchema = new mongoose.Schema(
  {
    // referencing the user who created the category
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expenses"],
    },
  },
  {
    timestamps: true,
  }
);

// Create a model using the schema
const Category = mongoose.model("CategoryUser", categorySchema);

module.exports = Category;
