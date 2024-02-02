const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  app: {
    port: process.env.PORT || 8000,
  },
  database: {
    url: "mongodb://localhost:27017/instagram",
  },
  redis: {
    url: "redis://default:DTxnSWIuTTYpz1w1dF1RZ6Eon9svOoA8@redis-10843.c322.us-east-1-2.ec2.cloud.redislabs.com:10843",
  },
  jwt: {
    secret: "sfuygfuygergkferygek",
  },
};
