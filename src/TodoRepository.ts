import { Todo } from "@prisma/client"
import { Result, Option, Some, None } from "ts-results"

import { ITodoRepository } from "./ITodoRepository"
import { PrismaService } from "./PrismaService"

export class TodoRepository implements ITodoRepository {
  private readonly _prisma: PrismaService

  public constructor(_prisma: PrismaService) {
    this._prisma = _prisma
  }

  public async save(todo: Todo): Promise<Result<Todo, Error>> {
    return Result.wrapAsync<Todo, Error>(() =>
      this._prisma.todo.create({
        data: todo,
      })
    )
  }

  public async findById(id: string): Promise<Option<Todo>> {
    const todo = await this._prisma.todo.findFirst({
      where: {
        id,
      },
    })

    if (!todo) {
      return None
    }

    return Some(todo)
  }
}
