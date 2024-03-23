import { DataModelUser } from "../../data/sources/postgres/data-model/model";

export interface IUser extends Pick<DataModelUser, "id" | "name" | "username" | "registeredAt"> {}

export interface ICreateUser extends Pick<DataModelUser, "name" | "username" | "password"> {}

export interface ILoginUser extends Pick<DataModelUser, "username" | "password"> {}
