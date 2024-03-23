import { IWhereContentDto, ICreateContentDto, IContentDto } from "../../api/dto/content";
import { ombedVideo } from "../../api/services/ombed";
import { IRepositoryContent } from "../interfaces/repositories/content";
import { IUseCaseContentCreateContent } from "../interfaces/usecases/content";

import modelContent from "../../api/dto/content";

export class UseCaseContentCreateContent implements IUseCaseContentCreateContent {
  private readonly repo: IRepositoryContent;

  constructor(repo: IRepositoryContent) {
    this.repo = repo;
  }

  public execute = async (where: IWhereContentDto, data: ICreateContentDto): Promise<IContentDto> => {
    const { userId } = where;
    const { comment, rating, videoUrl } = data;

    const { authorName, authorUrl, thumbnailUrl, title } = await ombedVideo(videoUrl);

    const newDataInfo = await this.repo.createContent(
      { userId },
      {
        comment,
        rating,
        videoUrl,
        creatorName: authorName,
        creatorUrl: authorUrl,
        thumnailUrl: thumbnailUrl,
        videoTitle: title,
      }
    );

    return Promise.resolve(modelContent.mapToContentDto(newDataInfo));
  };
}
