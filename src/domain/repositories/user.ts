import { IDataLinkUser } from "../../data/interfaces/data-links";
import { DataModelUser } from "../../data/sources/postgres/data-model/model";
import { IRepositoryUser, IWhereUser } from "../interfaces/repositories/user";
import { ICreateUser, IUser } from "../entities/user";

export class RepositoryUser implements IRepositoryUser {
  private link: IDataLinkUser;

  constructor(link: IDataLinkUser) {
    this.link = link;
  }

  public getById = async (where: IWhereUser): Promise<IUser> => {
    return await this.link.getById(where);
  };

  public createUser = async (user: ICreateUser): Promise<IUser> => {
    return await this.link.createUser(user);
  };

  public getByUsername = async (where: IWhereUser): Promise<DataModelUser> => {
    return await this.link.getByUsername(where);
  };
}
