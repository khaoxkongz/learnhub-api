import { IUpdateContentDto, IContentDto, IWhereContentDto } from "../../api/dto/content";
import { IRepositoryContent } from "../interfaces/repositories/content";
import { IUseCaseContentUpdateContentById } from "../interfaces/usecases/content";

import modelContent from "../../api/dto/content";

export class UseCaseContentUpdateContentById implements IUseCaseContentUpdateContentById {
  private readonly repo: IRepositoryContent;

  constructor(repo: IRepositoryContent) {
    this.repo = repo;
  }

  public execute = async (where: IWhereContentDto, data: IUpdateContentDto): Promise<IContentDto> => {
    const { userId, contentId } = where;
    const { comment, rating } = data;

    const numericContentId = Number(contentId);

    if (isNaN(numericContentId)) {
      return Promise.reject("Id is not a number");
    }

    const { user } = await this.repo.getContentById({ contentId: numericContentId });

    if (user.id !== userId) {
      return Promise.reject("Requested content is forbidden");
    }

    const updatedContent = await this.repo.updateContent({ contentId: numericContentId }, { comment, rating });
    return Promise.resolve(modelContent.mapToContentDto(updatedContent));
  };
}
