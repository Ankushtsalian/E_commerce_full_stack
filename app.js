const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get("/api/v1", (req, res) => res.send("hello world"));

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening at ${port}....`));
  } catch (error) {
    console.log(error);
  }
};
start();
