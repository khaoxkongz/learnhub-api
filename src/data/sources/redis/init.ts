import { RedisClientType, createClient } from "redis";
import { REDIS_URL } from "../../../domain/usecases/utils/config";
import { BaseDataLink } from "../init";

class BaseRedisDataLink extends BaseDataLink {
  protected readonly db: RedisClientType;
  constructor(db: RedisClientType) {
    super(db);
  }
}

export { RedisClientType, BaseRedisDataLink };

export const redis: RedisClientType = createClient({ url: REDIS_URL });
