import { Prisma } from "@prisma/client";

import { ICreateContent, IUpdateContent } from "../../../../domain/entities/content";
import { IWhereContent } from "../../../../domain/interfaces/repositories/content";

import modelUser from "./user";

const fromCreateToDataModel = (where: IWhereContent, content: ICreateContent): Prisma.ContentCreateInput => {
  return {
    ...content,
    user: modelUser.connectContentWithUserId(where),
  };
};

const fromUpdateToDataModel = (updateContent: IUpdateContent): Prisma.ContentUpdateInput => {
  const { comment, rating } = updateContent;
  return { comment, rating };
};

const fromContentIdToDeleteDataModel = (where: IWhereContent): Prisma.ContentWhereUniqueInput => {
  return { id: where.contentId };
};

const fromWhereContentIdToDataModel = (where: IWhereContent): Prisma.ContentWhereUniqueInput => {
  return { id: where.contentId };
};

const includeUserModel = (): Prisma.ContentInclude => {
  return { user: { select: modelUser.defaultUserSelect() } };
};

export default {
  includeUserModel,
  fromCreateToDataModel,
  fromUpdateToDataModel,
  fromWhereContentIdToDataModel,
  fromContentIdToDeleteDataModel,
};
