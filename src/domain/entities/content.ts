import { DataModelContent } from "../../data/sources/postgres/data-model/model";
import { IUser } from "./user";

export interface IContent extends Omit<DataModelContent, "userId"> {
  user: IUser;
}

export interface IContents extends Omit<DataModelContent, "userId"> {
  user: IUser;
}

export interface ICreateContent extends Omit<DataModelContent, "id" | "userId" | "createdAt" | "updatedAt"> {}

export interface IUpdateContent extends Pick<DataModelContent, "comment" | "rating"> {}
