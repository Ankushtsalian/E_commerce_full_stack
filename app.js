require("./db/connect");
require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

// Database
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/not-found");

// Middleware
app.use(express.json());

app.get("/api/v1", (req, res) => res.send("hello world"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening at ${port}....`));
  } catch (error) {
    console.log(error);
  }
};
start();
