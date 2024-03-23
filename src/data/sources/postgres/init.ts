import { PrismaClient as DbDriver } from "@prisma/client";
import { BaseDataLink } from "../init";

// Client for file schema.prisma
class BasePrismaSchemaDataLink extends BaseDataLink {
  protected readonly db: DbDriver;
  constructor(db: DbDriver) {
    super(db);
  }
}

export { DbDriver, BasePrismaSchemaDataLink };

export default new DbDriver();
