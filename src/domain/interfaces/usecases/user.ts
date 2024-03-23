import { IUserDto, IWhereUserDto } from "../../../api/dto/user";

import { ICreateUser, ILoginUser, IUser } from "../../entities/user";

export interface IUseCaseUserRegister {
  execute(data: ICreateUser): Promise<IUserDto>;
}

export interface IUseCaseUserLogin {
  execute(data: ILoginUser): Promise<IUser>;
}

export interface IUseCaseUserLogout {
  execute(token: string): Promise<void>;
}

export interface IUseCaseUserGetUserInfo {
  execute(where: IWhereUserDto): Promise<IUserDto>;
}

export interface IUseCaseUserGetUserName {
  execute(where: IWhereUserDto): Promise<IUserDto>;
}
