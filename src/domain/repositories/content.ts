import { IDataLinkContent } from "../../data/interfaces/data-links";
import { ICreateContent, IContent, IContents, IUpdateContent } from "../entities/content";
import { IRepositoryContent, IWhereContent } from "../interfaces/repositories/content";

export class RepositoryContent implements IRepositoryContent {
  private link: IDataLinkContent;

  constructor(link: IDataLinkContent) {
    this.link = link;
  }

  public createContent = async (where: IWhereContent, content: ICreateContent): Promise<IContent> => {
    return await this.link.createContent({ userId: where.userId }, content);
  };

  public getContentById = async (where: IWhereContent): Promise<IContent> => {
    return await this.link.getContentById({ contentId: where.contentId });
  };

  public getAllContents = async (): Promise<IContents[]> => {
    return await this.link.getAllContents();
  };

  public updateContent = async (where: IWhereContent, updateContent: IUpdateContent): Promise<IContent> => {
    return await this.link.updateContent({ contentId: where.contentId }, updateContent);
  };

  public deleteContent = async (where: IWhereContent): Promise<IContent> => {
    return await this.link.deleteContent({ contentId: where.contentId });
  };
}
