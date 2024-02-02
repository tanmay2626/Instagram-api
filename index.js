const app = require("./app");
const port = require("./config/config").app.port;
const connectDB = require("./config/database");
const { connectRedis } = require("./config/redis");

connectDB();

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
