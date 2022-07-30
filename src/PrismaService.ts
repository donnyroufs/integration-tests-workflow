import { PrismaClient } from "@prisma/client"

export class PrismaService extends PrismaClient {
  public constructor(url: string) {
    super({
      datasources: {
        db: {
          url,
        },
      },
    })
  }
}
