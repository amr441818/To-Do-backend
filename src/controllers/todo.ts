import { Response, Request, NextFunction } from "express";
import prisma from "../../prisma/index";
import { CustomRequest } from "../middlewares/is-auth";
import {
  serverSideErrorHandling,
  validationErrors,
} from "../middlewares/errorHandling";

//types
type RequestBody = { text: string };
type RequestParams = { todId: string };

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTodos = await prisma.todo.findMany();
    res.status(200).json(allTodos);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
export const createTodo = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  validationErrors(req, next);
  const { text } = req.body as RequestBody;
  try {
    const todo = await prisma.todo.create({
      data: {
        body: text,
        author: { connect: { id: req.userId } },
      },
    });
    res.status(200).json(todo);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validationErrors(req, next);
  const { todId } = req.params as RequestParams;
  const { text } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: todId },
      data: {
        body: text,
      },
    });
    res.status(201).json({ message: "updated successfully!", updatedTodo });
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { todId } = req.params as RequestParams;
  try {
    await prisma.todo.delete({
      where: { id: todId },
    });
    res.status(201).json({ message: "deleted successfully!" });
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
