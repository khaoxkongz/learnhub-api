import { DataModelUser } from "../../data/sources/postgres/data-model/model";
import { IUser } from "../../domain/entities/user";

export interface IUserDto extends Pick<DataModelUser, "id" | "name" | "username"> {
  registeredAt: string;
}

export interface ICreateUserDto extends Pick<DataModelUser, "name" | "username" | "password"> {}

export interface IWhereUserDto {
  userId?: string;
  username?: string;
}

export interface ILoginUserDto extends Pick<DataModelUser, "username" | "password"> {}

const mapToUserDto = (user: IUser): IUserDto => {
  const { id: registeredId, name: registeredName, username: registeredUsername, registeredAt } = user;

  const userData = {
    id: registeredId,
    name: registeredName,
    username: registeredUsername,
    registeredAt: registeredAt.toISOString(),
  };

  return userData;
};

export default { mapToUserDto };
