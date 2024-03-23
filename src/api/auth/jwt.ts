import { RequestHandler } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

import response from "../response";
import { getAuthHeader } from "../../domain/usecases/utils/auth";
import { IRepositoryBlackList } from "../../domain/interfaces/repositories/blacklist";
import { AUTH_SECRET } from "../../domain/usecases/utils/config";

export interface AuthPayload {
  id: string;
  username: string;
}

export interface AuthStatus {
  token: string;
  payload: AuthPayload;
}

export interface ICredentialDto {
  accessToken: string;
}

export interface IJWTMiddleware {
  authenticateJwt: RequestHandler<undefined, unknown, undefined, undefined, AuthStatus>;
}

export function generateJwt(payload: AuthPayload): string {
  return jwt.sign(payload, AUTH_SECRET, {
    algorithm: "HS512",
    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    expiresIn: "12h",
    issuer: "learnhub-api",
    subject: "user-login",
    audience: "user",
  });
}

export class JWTMiddleware implements IJWTMiddleware {
  private repo: IRepositoryBlackList;
  constructor(repo: IRepositoryBlackList) {
    this.repo = repo;
  }

  public authenticateJwt: IJWTMiddleware["authenticateJwt"] = async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      const token = getAuthHeader(authHeader);

      const isBlacklisted = await this.repo.isAlreadyBlacklist(token);

      if (isBlacklisted) {
        return response.Unauthorized(res, "You've already logged out");
      }

      const decoded = jwt.verify(token, AUTH_SECRET) as JwtPayload;

      res.locals = { token, payload: { id: decoded["id"], username: decoded["username"] } };

      return next();
    } catch (err) {
      const errMsg = `Auth failed for token`;
      console.error(`${errMsg}: ${err}`);
      if (err instanceof TypeError) {
        return response.Unauthorized(res, "authentication header is expected");
      }
      if (err instanceof JsonWebTokenError) {
        return response.Unauthorized(res, "Token is invalid");
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };
}
