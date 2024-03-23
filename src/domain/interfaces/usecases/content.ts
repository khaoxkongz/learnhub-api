import {
  IContentDto,
  IContentsDto,
  ICreateContentDto,
  IUpdateContentDto,
  IWhereContentDto,
} from "../../../api/dto/content";

export interface IUseCaseContentCreateContent {
  execute(where: IWhereContentDto, data: ICreateContentDto): Promise<IContentDto>;
}

export interface IUseCaseContentGetContentById {
  execute(where: IWhereContentDto): Promise<IContentDto>;
}

export interface IUseCaseContentGetAllContents {
  execute(): Promise<IContentsDto[]>;
}

export interface IUseCaseContentUpdateContentById {
  execute(where: IWhereContentDto, data: IUpdateContentDto): Promise<IContentDto>;
}

export interface IUseCaseContentDeleteContentById {
  execute(where: IWhereContentDto): Promise<IContentDto>;
}
