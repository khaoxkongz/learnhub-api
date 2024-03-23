import { IWhereContentDto, IContentDto } from "../../api/dto/content";
import { IRepositoryContent } from "../interfaces/repositories/content";
import { IUseCaseContentGetContentById } from "../interfaces/usecases/content";

import modelContent from "../../api/dto/content";

export class UseCaseContentGetContentById implements IUseCaseContentGetContentById {
  private readonly repo: IRepositoryContent;

  constructor(repo: IRepositoryContent) {
    this.repo = repo;
  }

  public execute = async (where: IWhereContentDto): Promise<IContentDto> => {
    const { contentId } = where;
    const numericContentId = Number(contentId);

    if (isNaN(numericContentId)) {
      return Promise.reject("Id is not a number");
    }

    const data = await this.repo.getContentById({ contentId: numericContentId });
    return Promise.resolve(modelContent.mapToContentDto(data));
  };
}
