const mongoose = require("mongoose");

// create schema
const transactionSchema = new mongoose.Schema(
  {
    // referencing the user who created the transaction
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expenses"],
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model using the schema
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
