import "dotenv/config";

import postgres from "./data/sources/postgres/init";
import { redis } from "./data/sources/redis/init";
import { App } from "./api/app";
import init from "./init";

const main = async (): Promise<void> => {
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

  return init(App, { postgres, redis }).listenAndServe(process.env.PORT || 8000);
};

main();
