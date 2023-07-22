import { createNewProject } from "../controllers/projects";
import express from "express";

export default (router: express.Router) => {
  router.post("/projects", createNewProject);
};
