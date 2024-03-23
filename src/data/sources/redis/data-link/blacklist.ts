import { JWT_BLACKLIST_REDIS_KEY_PREFIX, BLACKLIST_REDIS_VALUE } from "../../../../domain/usecases/utils/const";
import { IDataLinkBlackList } from "../../../interfaces/data-links";
import { BaseRedisDataLink, RedisClientType } from "../init";

class DataLinkBlackList extends BaseRedisDataLink implements IDataLinkBlackList {
  constructor(db: RedisClientType) {
    super(db);
  }

  public addToBlacklist = async (token: string, exp: number): Promise<void> => {
    const multi = this.db.multi();

    multi.set(`${JWT_BLACKLIST_REDIS_KEY_PREFIX}_${token}`, BLACKLIST_REDIS_VALUE);
    multi.expireAt(`${JWT_BLACKLIST_REDIS_KEY_PREFIX}_${token}`, exp);

    await multi.exec();
  };

  public isAlreadyBlacklist = async (token: string): Promise<boolean> => {
    const val = await this.db.GET(`${JWT_BLACKLIST_REDIS_KEY_PREFIX}_${token}`);
    return val === BLACKLIST_REDIS_VALUE;
  };
}

export { DataLinkBlackList };
