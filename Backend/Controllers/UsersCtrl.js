const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs"); // Fix typo here
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

// Create it as an object
const usersController = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // Validate
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are required...");
    }
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists...");
    }
    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create the user and save into the db
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
    // Get the user data
    const { email, password } = req.body;
    // If email is found
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    // Compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, "princekey", { expiresIn: "30d" });
    // Send the response
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
    // find the user
    console.log(req.user);
    const user = await User.findById(req.user);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    // Send the response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),
};

module.exports = usersController;
