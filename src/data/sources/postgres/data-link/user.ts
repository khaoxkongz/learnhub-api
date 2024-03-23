import { BasePrismaSchemaDataLink, DbDriver } from "../init";
import { DataModelUser } from "../data-model/model";
import modelUser from "../data-model/user";

import { IDataLinkUser } from "../../../interfaces/data-links";

import { IWhereUser } from "../../../../domain/interfaces/repositories/user";
import { ICreateUser, IUser } from "../../../../domain/entities/user";

export class DataLinkUser extends BasePrismaSchemaDataLink implements IDataLinkUser {
  constructor(db: DbDriver) {
    super(db);
  }

  public getById = async (where: IWhereUser): Promise<IUser> => {
    return await this.db.user.findUniqueOrThrow({
      where: modelUser.whereIdAndUserName(where),
      select: modelUser.defaultUserSelect(),
    });
  };

  public createUser = async (user: ICreateUser): Promise<IUser> => {
    return await this.db.user.create({
      data: modelUser.formCreateUserToDataModelUser(user),
    });
  };

  public getByUsername = async (where: IWhereUser): Promise<DataModelUser> => {
    return await this.db.user.findUniqueOrThrow({
      where: modelUser.whereIdAndUserName(where),
    });
  };
}
