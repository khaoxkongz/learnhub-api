import { IContentsDto } from "../../api/dto/content";
import { IRepositoryContent } from "../interfaces/repositories/content";
import { IUseCaseContentGetAllContents } from "../interfaces/usecases/content";

import modelContent from "../../api/dto/content";

export class UseCaseContentGetAllContents implements IUseCaseContentGetAllContents {
  private readonly repo: IRepositoryContent;

  constructor(repo: IRepositoryContent) {
    this.repo = repo;
  }

  public execute = async (): Promise<IContentsDto[]> => {
    const data = await this.repo.getAllContents();

    return Promise.resolve(modelContent.mapToContentsDto(data));
  };
}
