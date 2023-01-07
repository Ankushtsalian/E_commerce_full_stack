const express = require("express");
const app = express();
const port = process.env.Port || 5000;

app.get("/api/v1", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`listening at ${3000}`));
