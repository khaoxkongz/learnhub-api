import { IUseCaseUserGetUserName, IUseCaseUserRegister } from "../../domain/interfaces/usecases/user";
import { IHandlerUser } from "../routes/user";
import response from "../response";
import { REQUIRED_RECORD_NOTFOUND, UNIQUE_CONSTARINT_VIOLATION } from "../../domain/usecases/utils/const";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class HandlerUser implements IHandlerUser {
  private readonly usecaseRegister: IUseCaseUserRegister;
  private readonly usecaseGetUserName: IUseCaseUserGetUserName;

  constructor(args: { register: IUseCaseUserRegister; getUserName: IUseCaseUserGetUserName }) {
    this.usecaseRegister = args.register;
    this.usecaseGetUserName = args.getUserName;
  }

  public register: IHandlerUser["register"] = async (req, res) => {
    const { name, username, password: plainpassword } = req.body;
    if (!name) {
      return response.MissingField(res, "name");
    }
    if (!username) {
      return response.MissingField(res, "username");
    }
    if (!plainpassword) {
      return response.MissingField(res, "password");
    }

    if (typeof name !== "string" || name.length === 0) {
      return response.MissingField(res, "name");
    }

    if (typeof username !== "string" || username.length === 0) {
      return response.MissingField(res, "username");
    }

    if (typeof plainpassword !== "string") {
      return response.MissingField(res, "password");
    }

    if (plainpassword.length < 5) {
      return response.MissingField(res, "password");
    }

    try {
      const result = await this.usecaseRegister.execute({ name, username, password: plainpassword });
      return response.Created(res, result);
    } catch (error) {
      const errMsg = `failed to create user ${username}`;
      console.error(`${errMsg}: ${error}`);
      if (error instanceof PrismaClientKnownRequestError && error.code === UNIQUE_CONSTARINT_VIOLATION) {
        return response.InternalServerError(res, errMsg);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public getPersonalInfoByUserName: IHandlerUser["getPersonalInfoByUserName"] = async (req, res) => {
    const { username } = req.params;
    if (!username) {
      return response.MissingField(res, "username");
    }
    if (typeof username !== "string" || username.length === 0) {
      return response.MissingField(res, "username");
    }
    try {
      const userInfo = await this.usecaseGetUserName.execute({ username });
      return response.Ok(res, userInfo);
    } catch (error) {
      const errMsg = `username: ${username} does not exist`;
      console.error(`${errMsg}: ${error}`);
      if (error instanceof PrismaClientKnownRequestError && error.code === REQUIRED_RECORD_NOTFOUND) {
        return response.NotFound(res, errMsg);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };
}
