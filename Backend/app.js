const express = require("express");
const userRouter = require("./Routes/UserRouter");
const mongoose = require("mongoose");
const errorHandler = require("./Middlewares/errorHandlermiddleware");
const categoryRouter = require("./Routes/CategoryRouter");
const TransactionRouter = require("./Routes/TransactionRouter");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to mongoose
mongoose
  .connect(
    "mongodb+srv://princeolusegunojugbele:1Wm06P4gsHPleFlm@cluster0.fgotbs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

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
