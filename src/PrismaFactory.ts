import crypto from "crypto"
import { execSync } from "child_process"
import { join } from "path"

import { PrismaService } from "./PrismaService"

export class PrismaFactory {
  public make(schema = "public"): PrismaService {
    const url = this.getUrlWithoutSchema()

    return new PrismaService(url + "?schema=" + schema)
  }

  public makeTest() {
    const url = this.getUrlWithoutSchema()
    const schema = "schema-" + crypto.randomUUID()

    const prismaBinary = join(__dirname, "..", "node_modules", ".bin", "prisma")

    const databaseUrl = url + "?schema=" + schema

    execSync(`${prismaBinary} db push --skip-generate`, {
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl,
      },
    })

    return new PrismaService(databaseUrl)
  }

  private getUrlWithoutSchema(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return process.env.DATABASE_URL.split("?").at(0)!
  }
}
