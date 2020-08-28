const mongoose = require("mongoose");
const URI = require("../config/index");
// const localURI = "mongodb://127.0.0.1:27017/reactproject"

// Connecting to MongoDB, handles initial connection error
mongoose
  .connect(process.env.MONGODB_URI || URI, {
    useNewUrlParser: true,
  })
  .catch((error) => handleError(error));

// If there's an error after initial connection, send it
mongoose.connection.on("error", (error) => {
  console.log("Database connection error:", error);
});

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
  console.log("Connected to Database!!");
});
