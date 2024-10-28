require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./ConnectionString/dbConfig")
const errorHandler = require("./Middlewares/errorHandlermiddleware");
const userRouter = require("./Routes/UserRouter");
const categoryRouter = require("./Routes/CategoryRouter");
const TransactionRouter = require("./Routes/TransactionRouter");
dbConfig()
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
// Optionally, you can configure CORS with options
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", TransactionRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
