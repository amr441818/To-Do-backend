import express from "express";
const router = express.Router();
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo";
import isAuth from "../middlewares/is-auth";
import { todoValidations } from "../middlewares/errorHandling";

router.get("/todos", getAllTodos);
router.post("/todos", isAuth, todoValidations(), createTodo);
router.put("/todos/:todId", isAuth, updateTodo);
router.delete("/todos/:todId", isAuth, deleteTodo);
export default router;
