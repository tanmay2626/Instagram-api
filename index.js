const express = require("express");
const app = express();
const port = 8000 || process.env.PORT;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is responding!");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
