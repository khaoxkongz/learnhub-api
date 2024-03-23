import { BasePrismaSchemaDataLink, DbDriver } from "../init";
import { IDataLinkContent } from "../../../interfaces/data-links";

import modelContent from "../data-model/content";
import { IWhereContent } from "../../../../domain/interfaces/repositories/content";
import { IContent, IContents, ICreateContent, IUpdateContent } from "../../../../domain/entities/content";

export class DataLinkContent extends BasePrismaSchemaDataLink implements IDataLinkContent {
  constructor(db: DbDriver) {
    super(db);
  }

  public createContent = async (where: IWhereContent, content: ICreateContent): Promise<IContent> => {
    return await this.db.content.create({
      data: modelContent.fromCreateToDataModel(where, content),
      include: modelContent.includeUserModel(),
    });
  };

  public getContentById = async (where: IWhereContent): Promise<IContent> => {
    return await this.db.content.findUniqueOrThrow({
      where: modelContent.fromWhereContentIdToDataModel(where),
      include: modelContent.includeUserModel(),
    });
  };

  public getAllContents = async (): Promise<IContents[]> => {
    return await this.db.content.findMany({
      include: modelContent.includeUserModel(),
    });
  };

  public updateContent = async (where: IWhereContent, updateContent: IUpdateContent): Promise<IContent> => {
    return await this.db.content.update({
      where: modelContent.fromWhereContentIdToDataModel(where),
      data: modelContent.fromUpdateToDataModel(updateContent),
      include: modelContent.includeUserModel(),
    });
  };

  public deleteContent = async (where: IWhereContent): Promise<IContent> => {
    return await this.db.content.delete({
      where: modelContent.fromContentIdToDeleteDataModel(where),
      include: modelContent.includeUserModel(),
    });
  };
}
