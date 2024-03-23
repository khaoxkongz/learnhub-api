import { IWhereContentDto, IContentDto } from "../../api/dto/content";
import { IRepositoryContent } from "../interfaces/repositories/content";
import { IUseCaseContentDeleteContentById } from "../interfaces/usecases/content";

import modelContent from "../../api/dto/content";

export class UseCaseContentDeleteContentById implements IUseCaseContentDeleteContentById {
  private readonly repo: IRepositoryContent;

  constructor(repo: IRepositoryContent) {
    this.repo = repo;
  }

  public execute = async (where: IWhereContentDto): Promise<IContentDto> => {
    const { userId, contentId } = where;
    const numericContentId = Number(contentId);

    if (isNaN(numericContentId)) {
      return Promise.reject("Id is not a number");
    }

    const { user } = await this.repo.getContentById({ contentId: numericContentId });

    if (user.id !== userId) {
      return Promise.reject("Requested content is forbidden");
    }

    const deletedContent = await this.repo.deleteContent({ contentId: numericContentId });
    return Promise.resolve(modelContent.mapToContentDto(deletedContent));
  };
}
