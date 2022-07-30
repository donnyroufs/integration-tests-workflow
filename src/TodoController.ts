import { Request, Response } from "express"

import { ITodoRepository } from "./ITodoRepository"

type CreateTodoDto = {
  content: string
}

export class TodoController {
  public constructor(private readonly _todoRepository: ITodoRepository) {}

  public async store(
    req: Request<undefined, undefined, CreateTodoDto>,
    res: Response
  ) {
    if (!req.body?.content || typeof req.body.content !== "string") {
      return res.sendStatus(400)
    }

    const result = await this._todoRepository.save({
      content: req.body.content,
      completed: false,
    })

    if (result.err) {
      return res.status(400).json({
        message: result.val.message,
      })
    }

    return res.status(201).json({
      data: {
        id: result.val.id,
      },
    })
  }

  public async findById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params

    const todo = await this._todoRepository.findById(id)

    if (todo.none) {
      return res.status(404).json({
        message: `Todo with the id: ${id} was not found.`,
      })
    }

    return res.status(200).json({
      data: todo.val,
    })
  }
}
