import jwt, { JwtPayload } from "jsonwebtoken";

import { IUseCaseUserLogout } from "../interfaces/usecases/user";
import { AUTH_SECRET } from "./utils/config";
import { IRepositoryBlackList } from "../interfaces/repositories/blacklist";

export class UseCaseUserLogout implements IUseCaseUserLogout {
  private readonly repo: IRepositoryBlackList;

  constructor(repo: IRepositoryBlackList) {
    this.repo = repo;
  }

  public execute = async (token: string): Promise<void> => {
    const { exp } = jwt.verify(token, AUTH_SECRET) as JwtPayload;
    if (!exp) {
      return Promise.reject("exp is missing");
    }
    await this.repo.addToBlackList(token, exp * 1000);
  };
}
