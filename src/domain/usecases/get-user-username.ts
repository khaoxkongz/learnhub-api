import { IWhereUserDto, IUserDto } from "../../api/dto/user";
import { IRepositoryUser } from "../interfaces/repositories/user";
import { IUseCaseUserGetUserName } from "../interfaces/usecases/user";

import modelUser from "../../api/dto/user";

export class UseCaseUserGetUserName implements IUseCaseUserGetUserName {
  private readonly repo: IRepositoryUser;

  constructor(repo: IRepositoryUser) {
    this.repo = repo;
  }

  public execute = async (where: IWhereUserDto): Promise<IUserDto> => {
    const { password: _, updatedAt: __, ...userInfo } = await this.repo.getByUsername(where);
    return Promise.resolve(modelUser.mapToUserDto(userInfo));
  };
}
