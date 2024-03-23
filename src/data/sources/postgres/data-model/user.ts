import { Prisma } from "@prisma/client";

import { IWhereUser } from "../../../../domain/interfaces/repositories/user";
import { ICreateUser } from "../../../../domain/entities/user";
import { IWhereContent } from "../../../../domain/interfaces/repositories/content";

const defaultUserSelect = () => {
  return { id: true, name: true, username: true, registeredAt: true, password: false };
};

const includeDefaultUser = () => {
  return { user: { select: defaultUserSelect() } };
};

const formCreateUserToDataModelUser = (user: ICreateUser): Prisma.UserCreateInput => {
  const { name, username, password } = user;
  return { name, username, password };
};

const whereIdAndUserName = (where: IWhereUser): Prisma.UserWhereUniqueInput => {
  const { id, username } = where;
  return { id, username };
};

const connectContentWithUserId = (where: IWhereContent): Prisma.UserCreateNestedOneWithoutContentsInput => {
  return { connect: { id: where.userId } };
};

export default {
  defaultUserSelect,
  includeDefaultUser,
  whereIdAndUserName,
  formCreateUserToDataModelUser,
  connectContentWithUserId,
};
