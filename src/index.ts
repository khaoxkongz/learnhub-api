import postgres from "./data/sources/postgres/init";
import redis from "./data/sources/redis/init";

import { dbConnect } from "./domain/usecases/utils/config";
import { App } from "./api/app";

import init from "./init";

const main = async (): Promise<void> => {
  await dbConnect(postgres, redis);
  return init(App, { postgres, redis }).listenAndServe(process.env.PORT || 8000);
};

main();
