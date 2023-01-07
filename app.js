require("./db/connect");
require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

//rest of the packages
const morgan = require("morgan");

// Database
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

const authRouter = require("./Routes/auth");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// Middleware
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => res.send("hello world"));

//AUTH Router
app.use("/api/v1/auth", authRouter);

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
