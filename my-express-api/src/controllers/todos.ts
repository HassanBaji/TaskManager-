import express from "express";
import {
  getMyTodosById,
  updateTodosById,
  deleteTodosById,
  createNewTodos,
} from "../db/todos";

export const getMyTodos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }
    const todo = await getMyTodosById(id);
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const createTodos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, todos } = req.body;
    if (!email || !todos) {
      return res.sendStatus(400);
    }
    const newTodos = await createNewTodos({
      _id: email,
      tasks: todos.map(
        (task: { id: number; todo: string; isDone: boolean }) => ({
          id: task.id,
          todo: task.todo,
          isDone: task.isDone || false,
        })
      ),
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(200);
  }
};

export const updateTodos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { todos } = req.body;
    if (!id || !todos) {
      return res.sendStatus(400);
    }
    const newTodos = await updateTodosById(id, {
      tasks: todos.map(
        (task: { id: number; todo: string; isDone: boolean }) => ({
          id: task.id, // Generating a unique todoId for each task
          todo: task.todo,
          isDone: task.isDone || false, // Assuming isDone is a boolean value for each task
        })
      ),
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(200);
  }
};

export const deleteTodos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const deletedTodos = await deleteTodosById(id);
    return res.status(200).json(deleteTodos);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
