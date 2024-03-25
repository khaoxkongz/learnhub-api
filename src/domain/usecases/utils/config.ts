import "dotenv/config";
import { RedisClientType } from "redis";
import { DbDriver } from "../../../data/sources/postgres/init";

const { AUTH_SECRET: ENV_AUTH_SECRET, REDIS_URL: ENV_REDIS_URL } = process.env;

if (!ENV_AUTH_SECRET) {
  throw new Error("JWT_SECRET environment variable is not configured");
}

if (!ENV_REDIS_URL) {
  throw new Error("REDIS_URL environment variable is not configured");
}

const AUTH_SECRET = ENV_AUTH_SECRET;

const REDIS_URL = ENV_REDIS_URL;

const dbConnect = async (postgres: DbDriver, redis: RedisClientType): Promise<void> => {
  try {
    await postgres.$connect();
    await redis.connect();
  } catch (error) {
    console.error(`got db error: ${error.message}`);
    console.error(error.stack);
    return;
  } finally {
    await postgres.$disconnect();
    await redis.disconnect();
  }
};

export { AUTH_SECRET, REDIS_URL, dbConnect };
