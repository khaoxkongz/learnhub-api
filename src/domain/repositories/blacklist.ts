import { IDataLinkBlackList } from "../../data/interfaces/data-links";
import { IRepositoryBlackList } from "../interfaces/repositories/blacklist";

export class RepositoryBlackList implements IRepositoryBlackList {
  private link: IDataLinkBlackList;

  constructor(link: IDataLinkBlackList) {
    this.link = link;
  }

  public addToBlackList = async (token: string, exp: number): Promise<void> => {
    await this.link.addToBlacklist(token, exp);
  };

  public isAlreadyBlacklist = async (token: string): Promise<boolean> => {
    return await this.link.isAlreadyBlacklist(token);
  };
}
