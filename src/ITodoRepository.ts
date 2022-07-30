import { Todo } from "@prisma/client"
import { Option, Result } from "ts-results"

export interface ITodoRepository {
  save(todo: Omit<Todo, "id">): Promise<Result<Todo, Error>>
  findById(id: Todo["id"]): Promise<Option<Todo>>
}
