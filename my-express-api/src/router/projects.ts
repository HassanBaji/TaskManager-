import { isAuthenticated } from "../middlewares";
import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getMyProject,
  updateProject,
  updateTasks,
  updateUsers,
} from "../controllers/projects";
import express from "express";

export default (router: express.Router) => {
  router.post("/projects", isAuthenticated, createNewProject);
  router.patch("/projects-users/:id", isAuthenticated, updateUsers);
  router.patch("/projects-tasks/:id", isAuthenticated, updateTasks);
  router.put("/projects/:id", isAuthenticated, updateProject);
  router.delete("/projects/:id", isAuthenticated, deleteProject);
  router.get("/projects/:id", isAuthenticated, getMyProject);
  router.get("/projects", isAuthenticated, getAllProjects);
};
