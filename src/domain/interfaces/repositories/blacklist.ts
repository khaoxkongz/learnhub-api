export interface IRepositoryBlackList {
  addToBlackList(token: string, exp: number): Promise<void>;
  isAlreadyBlacklist(token: string): Promise<boolean>;
}
