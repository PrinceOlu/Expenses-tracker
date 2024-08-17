const express = require("express");
const usersController = require("../Controllers/UsersCtrl");
const isAuthenticated = require("../Middlewares/isAuth");

const userRouter = express.Router();

// Define the route for registering a user
userRouter.post("/api/v1/users/register", usersController.register);

// Define the route for login
userRouter.post("/api/v1/users/login", usersController.login);
// Define the route for profile
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  usersController.profile
);
// update password
userRouter.put(
  "/api/v1/users/update-password",
  isAuthenticated,
  usersController.changeUserPassword
);
// update Profile
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersController.changeUserProfile
);

module.exports = userRouter;
