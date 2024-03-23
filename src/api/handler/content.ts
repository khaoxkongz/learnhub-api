import { IHandlerContent } from "../routes/content";
import response from "../response";
import {
  IUseCaseContentCreateContent,
  IUseCaseContentDeleteContentById,
  IUseCaseContentGetAllContents,
  IUseCaseContentGetContentById,
  IUseCaseContentUpdateContentById,
} from "../../domain/interfaces/usecases/content";
import { AppErrors } from "../../domain/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { REQUIRED_RECORD_NOTFOUND } from "../../domain/usecases/utils/const";

export class HandlerContent implements IHandlerContent {
  private readonly usecaseCreateContent: IUseCaseContentCreateContent;
  private readonly usecaseGetContentById: IUseCaseContentGetContentById;
  private readonly usecaseGetAllContents: IUseCaseContentGetAllContents;
  private readonly usecaseUpdateContentById: IUseCaseContentUpdateContentById;
  private readonly usecaseDeleteContentById: IUseCaseContentDeleteContentById;

  constructor(args: {
    createContent: IUseCaseContentCreateContent;
    getContentById: IUseCaseContentGetContentById;
    getAllContents: IUseCaseContentGetAllContents;
    updateContentById: IUseCaseContentUpdateContentById;
    deleteContentById: IUseCaseContentDeleteContentById;
  }) {
    this.usecaseCreateContent = args.createContent;
    this.usecaseGetContentById = args.getContentById;
    this.usecaseGetAllContents = args.getAllContents;
    this.usecaseUpdateContentById = args.updateContentById;
    this.usecaseDeleteContentById = args.deleteContentById;
  }

  public createContent: IHandlerContent["createContent"] = async (req, res) => {
    const { id: userId } = res.locals.payload;
    const { comment, rating, videoUrl } = req.body;
    if (!userId) {
      return response.InternalServerError(res, AppErrors.MissingJWTPayload);
    }
    if (!comment) {
      return response.MissingField(res, "comment");
    }
    if (!rating) {
      return response.MissingField(res, "rating");
    }
    if (!videoUrl) {
      return response.MissingField(res, "videoUrl");
    }
    if (isNaN(rating)) {
      return response.MissingField(res, "rating");
    }
    if (rating < 0 || rating > 5) {
      return response.MissingField(res, "rating");
    }
    try {
      const contentDto = await this.usecaseCreateContent.execute({ userId }, { comment, rating, videoUrl });
      return response.Created(res, contentDto);
    } catch (error) {
      const errMsg = `failed to create content`;
      console.error(`${errMsg}: ${error}`);
      if (error instanceof URIError) {
        return response.MissingField(res, "videoUrl");
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public getContentById: IHandlerContent["getContentById"] = async (req, res) => {
    const { id: contentId } = req.params;
    if (!contentId) {
      return response.MissingParam(res, "id");
    }

    try {
      const contentDto = await this.usecaseGetContentById.execute({ contentId });
      return response.Ok(res, contentDto);
    } catch (error) {
      const errMsg = `failed to get content: ${contentId}`;
      console.error(`${errMsg}: ${error}`);
      if (error === "Id is not a number") {
        return response.MissingParam(res, "id");
      }
      if (error instanceof PrismaClientKnownRequestError && error.code === REQUIRED_RECORD_NOTFOUND) {
        return response.NotFound(res, errMsg);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public getAllContents: IHandlerContent["getAllContents"] = async (req, res) => {
    try {
      const contentDto = await this.usecaseGetAllContents.execute();
      return response.Ok(res, contentDto);
    } catch (error) {
      const errMsg = `failed to get all contents`;
      console.error(`${errMsg}: ${error}`);
      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public updateContentById: IHandlerContent["updateContentById"] = async (req, res) => {
    const { id: contentId } = req.params;
    const { comment, rating } = req.body;
    const { id: userId } = res.locals.payload;

    if (!userId) {
      return response.InternalServerError(res, AppErrors.MissingJWTPayload);
    }
    if (!comment) {
      return response.MissingField(res, "comment");
    }
    if (!rating) {
      return response.MissingField(res, "rating");
    }
    if (typeof comment !== "string" || comment.length === 0) {
      return response.MissingField(res, "comment");
    }
    if (typeof rating !== "number") {
      return response.MissingField(res, "rating");
    }
    if (isNaN(rating)) {
      return response.MissingField(res, "rating");
    }
    if (rating < 0 || rating > 5) {
      return response.MissingField(res, "rating");
    }

    try {
      const contentDto = await this.usecaseUpdateContentById.execute({ userId, contentId }, { comment, rating });
      return response.Ok(res, contentDto);
    } catch (error) {
      const errMsg = `failed to update content for ${contentId}`;
      console.error(`${errMsg}: ${error}`);
      if (error === "Id is not a number") {
        return response.MissingParam(res, "id");
      }
      if (error === "Requested content is forbidden") {
        return response.Unauthorized(res, errMsg);
      }
      if (error instanceof PrismaClientKnownRequestError && error.code === REQUIRED_RECORD_NOTFOUND) {
        return response.NotFound(res, AppErrors.ContentNotFound);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };

  public deleteContentById: IHandlerContent["deleteContentById"] = async (req, res) => {
    const { id: contentId } = req.params;
    const { id: userId } = res.locals.payload;

    if (!contentId) {
      return response.MissingParam(res, "id");
    }

    if (!userId) {
      return response.InternalServerError(res, AppErrors.MissingJWTPayload);
    }

    try {
      const contentDto = await this.usecaseDeleteContentById.execute({ userId, contentId });
      return response.Ok(res, contentDto);
    } catch (error) {
      const errMsg = `failed to delete content for ${contentId}`;
      console.error(`${errMsg}: ${error}`);
      if (error === "Id is not a number") {
        return response.MissingParam(res, "id");
      }
      if (error === "Requested content is forbidden") {
        return response.Unauthorized(res, errMsg);
      }
      if (error instanceof PrismaClientKnownRequestError && error.code === REQUIRED_RECORD_NOTFOUND) {
        return response.NotFound(res, AppErrors.ContentNotFound);
      }
      return response.InternalServerError(res, "Internal Server Error");
    }
  };
}
