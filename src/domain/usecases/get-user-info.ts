import { IWhereUserDto, IUserDto } from "../../api/dto/user";
import { IRepositoryUser } from "../interfaces/repositories/user";
import { IUseCaseUserGetUserInfo } from "../interfaces/usecases/user";

import modelUser from "../../api/dto/user";

export class UseCaseUserGetUserInfo implements IUseCaseUserGetUserInfo {
  private readonly repo: IRepositoryUser;

  constructor(repo: IRepositoryUser) {
    this.repo = repo;
  }

  public execute = async (user: IWhereUserDto): Promise<IUserDto> => {
    const newUser = await this.repo.getById({ id: user.userId });
    return Promise.resolve(modelUser.mapToUserDto(newUser));
  };
}
