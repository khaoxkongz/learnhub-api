import { ILoginUser, IUser } from "../entities/user";
import { IRepositoryUser } from "../interfaces/repositories/user";
import { IUseCaseUserLogin } from "../interfaces/usecases/user";
import { compareHash } from "./utils/bcrypt";

export class UseCaseUserLogin implements IUseCaseUserLogin {
  private readonly repo: IRepositoryUser;

  constructor(repo: IRepositoryUser) {
    this.repo = repo;
  }

  public execute = async (user: ILoginUser): Promise<IUser> => {
    const { username, password: plainpassword } = user;
    const _user = await this.repo.getByUsername({ username });
    if (!compareHash(plainpassword, _user.password)) {
      return Promise.reject(`invalid password for user ${username}`);
    }
    const { password: _, updatedAt: __, ...userInfo } = _user;
    return Promise.resolve(userInfo);
  };
}
