import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "../config";

const redisUrl = `redis://${REDIS_HOST}:${REDIS_PORT}`;

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connect successfully");
    redisClient.set("try", "Hello Welcome to Express with TypeORM");
  } catch (error) {
    redisClient.disconnect();
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
