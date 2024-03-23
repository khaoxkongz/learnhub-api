import { RedisClientType } from "redis";
import { DbDriver } from "./data/sources/postgres/init";

import { DataLinkUser } from "./data/sources/postgres/data-link/user";
import { DataLinkBlackList } from "./data/sources/redis/data-link/blacklist";
import { DataLinkContent } from "./data/sources/postgres/data-link/content";

import { RepositoryUser } from "./domain/repositories/user";
import { RepositoryBlackList } from "./domain/repositories/blacklist";
import { RepositoryContent } from "./domain/repositories/content";

import { UseCaseUserLogin } from "./domain/usecases/login";
import { UseCaseUserLogout } from "./domain/usecases/logout";
import { UseCaseUserRegister } from "./domain/usecases/register";
import { UseCaseUserGetUserInfo } from "./domain/usecases/get-user-info";
import { UseCaseUserGetUserName } from "./domain/usecases/get-user-username";

import { UseCaseContentCreateContent } from "./domain/usecases/create-content";
import { UseCaseContentGetAllContents } from "./domain/usecases/get-all-contents";
import { UseCaseContentGetContentById } from "./domain/usecases/get-content-id";
import { UseCaseContentUpdateContentById } from "./domain/usecases/update-content-id";
import { UseCaseContentDeleteContentById } from "./domain/usecases/delete-content-id";

import { HandlerUser } from "./api/handler/user";
import { HandlerAuthUser } from "./api/handler/auth";
import { HandlerContent } from "./api/handler/content";
import { App, ArgCreateApp } from "./api/app";
import { JWTMiddleware } from "./api/auth/jwt";

const init = <T extends App>(
  // t is class symbol of any type whose
  // constructor takes in ArgCreateApp and returns T
  t: { new (arg: ArgCreateApp): T },
  arg: { postgres: DbDriver; redis: RedisClientType }
): T => {
  const dataLinkBlackList = new DataLinkBlackList(arg.redis);
  const repoBlackList = new RepositoryBlackList(dataLinkBlackList);

  const jwtMiddleware = new JWTMiddleware(repoBlackList);

  const dataLinkUser = new DataLinkUser(arg.postgres);
  const repoUser = new RepositoryUser(dataLinkUser);

  const handlerAuthUser = new HandlerAuthUser({
    login: new UseCaseUserLogin(repoUser),
    logout: new UseCaseUserLogout(repoBlackList),
    getUserInfo: new UseCaseUserGetUserInfo(repoUser),
  });

  const handlerUser = new HandlerUser({
    register: new UseCaseUserRegister(repoUser),
    getUserName: new UseCaseUserGetUserName(repoUser),
  });

  const dataLinkContent = new DataLinkContent(arg.postgres);
  const repoContent = new RepositoryContent(dataLinkContent);
  const handlerContent = new HandlerContent({
    createContent: new UseCaseContentCreateContent(repoContent),
    getContentById: new UseCaseContentGetContentById(repoContent),
    getAllContents: new UseCaseContentGetAllContents(repoContent),
    updateContentById: new UseCaseContentUpdateContentById(repoContent),
    deleteContentById: new UseCaseContentDeleteContentById(repoContent),
  });

  return new t({
    auth: handlerAuthUser,
    user: handlerUser,
    content: handlerContent,
    jwt: jwtMiddleware,
  });
};

export default init;
