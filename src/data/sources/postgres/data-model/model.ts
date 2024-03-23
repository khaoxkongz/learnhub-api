import { User as DataModelUser, Content as DataModelContent, Prisma } from "@prisma/client";

export type UserDb = Prisma.UserDelegate<any>;
export type ContentDb = Prisma.ContentDelegate<any>;

export type DbUserOnly = "registeredAt" | "updatedAt";
export type DbContentOnly = "createdAt" | "updatedAt";
export type DbUserId = "userId";
export type DbContentId = "id" | "userId";
export type DbUpdateContent = "comment" | "rating";

export { DataModelUser, DataModelContent };
