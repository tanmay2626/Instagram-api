const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const followRoutes = require("./routes/follow.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", followRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = app;
