import { RequestHandler } from "express";
import { Router } from "./router";
import { AuthStatus, IJWTMiddleware } from "../auth/jwt";
import { ILoginUserDto } from "../dto/user";

export interface IHandlerAuthUser {
  login: RequestHandler<undefined, unknown, ILoginUserDto>;
  logout: RequestHandler<undefined, unknown, undefined, undefined, AuthStatus>;
  getPersonalInfoById: RequestHandler<unknown, unknown, unknown, unknown, AuthStatus>;
}

export class RouterAuthUser extends Router {
  private readonly jwt: IJWTMiddleware;
  constructor(handler: IHandlerAuthUser, jwt: IJWTMiddleware) {
    super();
    this.jwt = jwt;

    this.router().post("/login", handler.login);

    this.router().use(this.jwt.authenticateJwt);

    this.router().post("/logout", handler.logout);
    this.router().get("/me", handler.getPersonalInfoById);
  }
}
