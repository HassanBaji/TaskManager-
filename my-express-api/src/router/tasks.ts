import express from "express";
import {
  isAuthenticated,
  isOwnerProject,
  isPartOfProject,
  isPartOfProjectFromTask,
} from "../middlewares";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  getMytask,
  updateTaskDetails,
  updateTaskStatus,
} from "../controllers/tasks";
export default (router: express.Router) => {
  router.get("/tasks", isAuthenticated, getAllTasks);
  router.get("/tasks/:id", isAuthenticated, isPartOfProjectFromTask, getMytask);
  router.post("/tasks/:id", isAuthenticated, createNewTask);
  router.patch("/tasks-status", isAuthenticated, updateTaskStatus);
  router.patch("/tasks-details/:id", isAuthenticated, updateTaskDetails);
  router.delete("/tasks/:id", isAuthenticated, deleteTask);
};
