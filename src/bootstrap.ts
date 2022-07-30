import "dotenv/config"
import "reflect-metadata"

import express from "express"

import { ITodoRepository } from "./ITodoRepository"
import { PrismaService } from "./PrismaService"
import { TodoController } from "./TodoController"
import { TodoRepository } from "./TodoRepository"
import { PrismaFactory } from "./PrismaFactory"

export async function bootstrap(prismaService: PrismaService) {
  const todoRepo: ITodoRepository = new TodoRepository(prismaService)
  const todoController = new TodoController(todoRepo)

  const app = express()

  app.use(express.json())

  app.get("/todos/:id", todoController.findById.bind(todoController))
  app.post("/todos", todoController.store.bind(todoController))

  await prismaService.$connect().catch((err) => {
    console.error(err)
    process.exit(0)
  })

  const server = app.listen(process.env.PORT, () => {
    console.log("server is listening")
  })

  return server
}

if (process.env.NODE_ENV !== "test") {
  bootstrap(new PrismaFactory().make())
}
