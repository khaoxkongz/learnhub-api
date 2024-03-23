import { DataModelUser } from "../sources/postgres/data-model/model";

import { IWhereUser } from "../../domain/interfaces/repositories/user";
import { ICreateUser, IUser } from "../../domain/entities/user";
import { IContent, IContents, ICreateContent, IUpdateContent } from "../../domain/entities/content";
import { IWhereContent } from "../../domain/interfaces/repositories/content";

export interface IDataLinkUser {
  getById(where: IWhereUser): Promise<IUser>;
  createUser(user: ICreateUser): Promise<IUser>;
  getByUsername(where: IWhereUser): Promise<DataModelUser>;
}

export interface IDataLinkContent {
  createContent(where: IWhereContent, content: ICreateContent): Promise<IContent>;
  getContentById(where: IWhereContent): Promise<IContent>;
  getAllContents(): Promise<IContents[]>;
  updateContent(where: IWhereContent, updateContent: IUpdateContent): Promise<IContent>;
  deleteContent(where: IWhereContent): Promise<IContent>;
}

export interface IDataLinkBlackList {
  addToBlacklist(token: string, exp: number): Promise<void>;
  isAlreadyBlacklist(token: string): Promise<boolean>;
}
