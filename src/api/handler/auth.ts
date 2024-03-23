import response from "../response";

import { IHandlerAuthUser } from "../routes/auth";
import { IUseCaseUserGetUserInfo, IUseCaseUserLogin, IUseCaseUserLogout } from "../../domain/interfaces/usecases/user";
import { AppErrors } from "../../domain/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { REQUIRED_RECORD_NOTFOUND } from "../../domain/usecases/utils/const";
import { AuthPayload, generateJwt } from "../auth/jwt";

export class HandlerAuthUser implements IHandlerAuthUser {
  private readonly usecaseLogin: IUseCaseUserLogin;
  private readonly usecaseLogout: IUseCaseUserLogout;
  private readonly usecaseGetUserInfo: IUseCaseUserGetUserInfo;

  constructor(args: { logout: IUseCaseUserLogout; login: IUseCaseUserLogin; getUserInfo: IUseCaseUserGetUserInfo }) {
    this.usecaseLogin = args.login;
    this.usecaseLogout = args.logout;
    this.usecaseGetUserInfo = args.getUserInfo;
  }

  public login: IHandlerAuthUser["login"] = async (req, res) => {
    const { username, password: plainpassword } = req.body;
    if (!username) {
      return response.MissingField(res, "username");
    }
    if (!plainpassword) {
      return response.MissingField(res, "password");
    }

    if (typeof username !== "string" || username.length === 0) {
      return response.MissingField(res, "username");
    }

    if (typeof plainpassword !== "string") {
      return response.MissingField(res, "password");
    }

    try {
      const user = await this.usecaseLogin.execute({ username, password: plainpassword });
      const payload: AuthPayload = {
        id: user.id,
        username: user.username,
      };

      const accessToken = generateJwt(payload);
      return response.Ok(res, { id: user.id, username: user.username, accessToken });
    } catch (error) {
      const errMsg = `failed to login user ${username}`;
      console.error(`${errMsg}: ${error}`);
      if (error instanceof PrismaClientKnownRequestError && error.code === REQUIRED_RECORD_NOTFOUND) {
        return response.Unauthorized(res, errMsg);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public logout: IHandlerAuthUser["logout"] = async (_req, res) => {
    const { token } = res.locals;
    if (!token) {
      return response.InternalServerError(res, AppErrors.MissingJWTPayload);
    }
    try {
      await this.usecaseLogout.execute(token);
      return response.Ok(res, "logout success");
    } catch (error) {
      const errMsg = `failed to logged out`;
      console.error(`${errMsg}: ${error}`);

      if (error === "exp is missing") {
        return response.InternalServerError(res, AppErrors.MissingJWTPayload);
      }

      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public getPersonalInfoById: IHandlerAuthUser["getPersonalInfoById"] = async (_req, res) => {
    const { id: userId } = res.locals.payload;
    if (!userId) {
      return response.MissingField(res, "userId");
    }
    try {
      const userInfo = await this.usecaseGetUserInfo.execute({ userId });
      return response.Ok(res, userInfo);
    } catch (error) {
      const errMsg = `user_id: ${userId} does not exist`;
      console.error(`${errMsg}: ${error}`);
      if (error instanceof PrismaClientKnownRequestError && error.code === REQUIRED_RECORD_NOTFOUND) {
        return response.NotFound(res, errMsg);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };
}
