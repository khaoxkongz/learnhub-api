import { DataModelContent } from "../../data/sources/postgres/data-model/model";
import { IContent, IContents } from "../../domain/entities/content";
import { IUserDto } from "./user";

export interface IContentDto extends Omit<DataModelContent, "userId" | "createdAt" | "updatedAt"> {
  postedBy: IUserDto;
  createdAt: string;
  updatedAt: string;
}

export interface IContentsDto extends Omit<DataModelContent, "userId" | "createdAt" | "updatedAt"> {
  postedBy: IUserDto;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateContentDto extends Pick<DataModelContent, "videoUrl" | "comment" | "rating"> {}

export interface IUpdateContentDto extends Pick<DataModelContent, "comment" | "rating"> {}

export interface IWhereContentDto {
  userId?: string;
  contentId?: string;
}

const mapToContentDto = (content: IContent): IContentDto => {
  const { user, createdAt, updatedAt, ...contentInfo } = content;
  const { registeredAt, ...userInfo } = user;

  const newUser = {
    ...userInfo,
    registeredAt: registeredAt.toISOString(),
  };

  const contentData = {
    ...contentInfo,
    postedBy: newUser,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };

  return contentData;
};

const mapToContentsDto = (contents: IContents[]): IContentsDto[] => {
  const contentList = contents.map((content) => {
    return mapToContentDto(content);
  });

  return contentList;
};

export default { mapToContentDto, mapToContentsDto };
