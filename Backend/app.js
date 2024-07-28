const express = require("express");
const userRouter = require("./Routes/UserRouter");
const mongoose = require("mongoose");
const errorHandler = require("./Middlewares/errorHandlermiddleware");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// connect to mongoose
mongoose
  .connect(
    `mongodb+srv://princeolusegunojugbele:1Wm06P4gsHPleFlm@cluster0.fgotbs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Db connected");
  })
  .catch((error) => {
    console.log(error);
  });
// Routes middleware
app.use("/", userRouter);
// Error handle
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
