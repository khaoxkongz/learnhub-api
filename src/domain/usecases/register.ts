import { IUserDto } from "../../api/dto/user";
import { ICreateUser } from "../entities/user";
import { IRepositoryUser } from "../interfaces/repositories/user";
import { IUseCaseUserRegister } from "../interfaces/usecases/user";
import { hashPassword } from "./utils/bcrypt";

import modelUser from "../../api/dto/user";

export class UseCaseUserRegister implements IUseCaseUserRegister {
  private readonly repo: IRepositoryUser;

  constructor(repo: IRepositoryUser) {
    this.repo = repo;
  }

  public execute = async (user: ICreateUser): Promise<IUserDto> => {
    const { password: plainpassword, ...userInfo } = user;
    const newUser = await this.repo.createUser({ ...userInfo, password: hashPassword(plainpassword) });
    return Promise.resolve(modelUser.mapToUserDto(newUser));
  };
}
