import { RedisClientType } from "redis";
import { DbDriver } from "./postgres/init";

type AppDB = RedisClientType | DbDriver;

class BaseDataLink {
  protected readonly db: AppDB;
  constructor(db: AppDB) {
    this.db = db;
  }
}

export { BaseDataLink, AppDB };
