const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const bcrypt = require("bcryptjs");

const usersController = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are required...");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists...");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  // Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, "princekey", { expiresIn: "30d" });
    res.json({
      message: "Login successful...",
      token,
      username: user.username,
      email: user.email,
      id: user._id,
    });
  }),

  // Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    res.json({
      username: user.username,
      email: user.email,
    });
  }),

  // Change password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    // Log the received newPassword
    console.log("New Password:", newPassword);

    if (!newPassword) {
      res.status(400);
      throw new Error("New password is required");
    }

    // Find the user
    const user = await User.findById(req.user);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password changed successfully",
    });
  }),

  // Update user profile
  changeUserProfile: asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true }
    );
    res.json({
      message: "User profile updated successfully",
      updatedUser,
    });
  }),
};

module.exports = usersController;
