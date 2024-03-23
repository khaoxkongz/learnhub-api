import { IContent, IContents, ICreateContent, IUpdateContent } from "../../entities/content";

export interface IWhereContent {
  userId?: string;
  contentId?: number;
}

export interface IRepositoryContent {
  createContent(where: IWhereContent, content: ICreateContent): Promise<IContent>;
  getContentById(where: IWhereContent): Promise<IContent>;
  getAllContents(): Promise<IContents[]>;
  updateContent(where: IWhereContent, updateContent: IUpdateContent): Promise<IContent>;
  deleteContent(where: IWhereContent): Promise<IContent>;
}
