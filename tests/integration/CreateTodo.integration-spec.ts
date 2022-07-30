import { Server } from "http"
import supertest from "supertest"

import { bootstrap } from "../../src/bootstrap"
import { PrismaService } from "../../src/PrismaService"
import { PrismaFactory } from "../../src/PrismaFactory"

describe("Create Todo", () => {
  let server: Server
  let prismaService: PrismaService
  const prismaFactory = new PrismaFactory()

  beforeAll(async () => {
    prismaService = prismaFactory.makeTest()
    server = await bootstrap(prismaService)
  })

  afterAll(() => {
    server.close()
    prismaService.$disconnect()
  })

  describe("[POST] /todos/store", () => {
    test("creates a todo", async () => {
      const content = "my first todo" + new Date().toString()
      const res = await supertest(server).post("/todos")
      .send({
        content,
      })

      expect(res.statusCode).toBe(201)

      const confirmation = await supertest(server).get(
        "/todos/" + res.body.data.id
      )

      expect(confirmation.body.data.content).toBe(content)
    })

    test('sends a 400 request when invalid dto', async () => {
        const res = await supertest(server).post("/todos")
        .send({ })

        expect(res.statusCode).toBe(400)
    })
  })

})
