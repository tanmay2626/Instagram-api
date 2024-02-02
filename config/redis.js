const { createClient } = require("redis");
const connection = require("./config");

exports.connectRedis = async () => {
  try {
    const client = createClient({ url: connection.redis.url });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    return client;
  } catch (error) {
    console.log(error);
  }
};
