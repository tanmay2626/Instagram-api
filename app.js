const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user/user.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = app;
