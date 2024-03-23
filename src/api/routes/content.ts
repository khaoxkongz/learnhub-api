import { RequestHandler } from "express";
import { Router } from "./router";
import { AuthStatus, IJWTMiddleware } from "../auth/jwt";
import { ICreateContentDto, IUpdateContentDto } from "../dto/content";

export interface IHandlerContent {
  createContent: RequestHandler<undefined, unknown, ICreateContentDto, undefined, AuthStatus>;
  getContentById: RequestHandler<{ id: string }, unknown>;
  getAllContents: RequestHandler<undefined, unknown>;
  updateContentById: RequestHandler<{ id: string }, unknown, IUpdateContentDto, undefined, AuthStatus>;
  deleteContentById: RequestHandler<{ id: string }, unknown, undefined, undefined, AuthStatus>;
}

export class RouterContent extends Router {
  private readonly jwt: IJWTMiddleware;

  constructor(handler: IHandlerContent, jwt: IJWTMiddleware) {
    super();
    this.jwt = jwt;

    this.router().get("/", handler.getAllContents);
    this.router().get("/:id", handler.getContentById);

    this.router().use(this.jwt.authenticateJwt);
    this.router().post("/", handler.createContent);
    this.router().patch("/:id", handler.updateContentById);
    this.router().delete("/:id", handler.deleteContentById);
  }
}
