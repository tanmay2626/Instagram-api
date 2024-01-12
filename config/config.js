const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  app: {
    port: process.env.PORT || 8000,
  },
  database: {
    url: "mongodb://localhost:27017/instagram",
  },
  jwt: {
    secret: "sfuygfuygergkferygek",
  },
};
