const express = require("express");
const categoryController = require("../Controllers/CategoryCtrl");
const isAuthenticated = require("../Middlewares/isAuth");
const CategoryRouter = express.Router(); // Declare CategoryRouter only once

// Define the route for adding Category
CategoryRouter.post(
  "/api/v1/categories/create", // Remove base path here
  isAuthenticated,
  categoryController.create
);

// Define the route for listing Categories
CategoryRouter.get(
  "/api/v1/categories/lists", // Remove base path here
  isAuthenticated,
  categoryController.lists
);
// Define the route for updating Categories
CategoryRouter.put(
  "/api/v1/categories/update/:id", // Remove base path here
  isAuthenticated,
  categoryController.update
);
// Define the route for deleting Categories
CategoryRouter.delete(
  "/api/v1/categories/delete/:id", // Remove base path here
  isAuthenticated,
  categoryController.delete
);

module.exports = CategoryRouter; // Export CategoryRouter
