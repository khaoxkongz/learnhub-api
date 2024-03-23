import { RequestHandler } from "express";
import { Router } from "./router";
import { ICreateUserDto, IUserDto, IWhereUserDto } from "../dto/user";

export interface IHandlerUser {
  register: RequestHandler<undefined, IUserDto, ICreateUserDto>;
  getPersonalInfoByUserName: RequestHandler<IWhereUserDto, unknown>;
}

export class RouterUser extends Router {
  constructor(handler: IHandlerUser) {
    super();

    this.router().post("/register", handler.register);
    this.router().get("/:username", handler.getPersonalInfoByUserName);
  }
}
