const app = require("./app");
const port = require("./config/config").app.port;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
