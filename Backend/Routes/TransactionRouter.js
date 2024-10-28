const express = require("express");
const categoryController = require("../Controllers/CategoryCtrl");
const isAuthenticated = require("../Middlewares/isAuth");
const transactionController = require("../Controllers/TransactionCtrl");
const TransactionRouter = express.Router(); // Declare Transaction only once

// Define the route for adding Category
TransactionRouter.post("/api/v1/transactions/create",isAuthenticated,transactionController.create);

// Define the route for listing Categories
TransactionRouter.get("/api/v1/transactions/lists",isAuthenticated,transactionController.getFilteredTransactions);
// update
TransactionRouter.put("/api/v1/transactions/update/:id",isAuthenticated,transactionController.update);
// delete
TransactionRouter.delete("/api/v1/transactions/delete/:id",isAuthenticated,transactionController.delete);

module.exports = TransactionRouter; // Export Transaction
