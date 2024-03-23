import { DataModelUser } from "../../../data/sources/postgres/data-model/model";
import { ICreateUser, IUser } from "../../entities/user";

export interface IWhereUser {
  id?: string;
  username?: string;
}

export interface IRepositoryUser {
  getById(where: IWhereUser): Promise<IUser>;
  createUser(user: ICreateUser): Promise<IUser>;
  getByUsername(where: IWhereUser): Promise<DataModelUser>;
}
