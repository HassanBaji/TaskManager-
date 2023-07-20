import express from "express";
import {
  createTodos,
  getMyTodos,
  updateTodos,
  deleteTodos,
} from "../controllers/todos";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.post("/todos", isAuthenticated, createTodos);
  router.put("/todos/:id", isAuthenticated, updateTodos);
  router.get("/todos/:id", isAuthenticated, getMyTodos);
  router.delete("/todos/:id", isAuthenticated, deleteTodos);
};
