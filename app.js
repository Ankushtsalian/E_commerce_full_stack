require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const path = require("path");
// Express
const express = require("express");
const app = express();

//Serve React app
app.use(express.static(path.join(__dirname, ".", "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".", "client", "build"));
});

app.use(
  cors({
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : "https://e-commerce-node-qttl.onrender.com",
    credentials: true,
  })
);

//rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

// Database
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user");
const productRouter = require("./Routes/product");
const reviewRouter = require("./Routes/review");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileupload());

// app.get("/", (req, res) => {
//   res.send("hello world   test");
// });
app.get("/api/v1", (req, res) => {
  res.status("200").json({ cookie: req.signedCookies });
});

//AUTH Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

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
