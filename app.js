require("./db/connect");
require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

app.get("/api/v1", (req, res) => res.send("hello world"));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening at ${port}....`));
  } catch (error) {
    console.log(error);
  }
};
start();
