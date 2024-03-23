import "dotenv/config";

const { AUTH_SECRET: ENV_AUTH_SECRET, REDIS_URL: ENV_REDIS_URL } = process.env;

if (!ENV_AUTH_SECRET) {
  throw new Error("JWT_SECRET environment variable is not configured");
}

if (!ENV_REDIS_URL) {
  throw new Error("REDIS_URL environment variable is not configured");
}

export const AUTH_SECRET = ENV_AUTH_SECRET;

export const REDIS_URL = ENV_REDIS_URL;
