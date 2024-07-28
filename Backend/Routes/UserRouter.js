const express = require("express");
const usersController = require("../Controllers/UsersCtrl");

const userRouter = express.Router();

// Define the route for registering a user
userRouter.post("/api/v1/users/register", usersController.register);
// Define the route for login
userRouter.post("/api/v1/users/login", usersController.login);

module.exports = userRouter;
