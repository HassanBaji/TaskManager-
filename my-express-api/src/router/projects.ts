import { isAuthenticated, isOwnerProject } from "../middlewares";
import // createNewProject,
// getAllMyProjects,
// deleteProject,
// getMyProject,
// updateProject,ß
// updateTasks,
// updateUsers,
"../controllers/projects";
import { getAllProjectEndPoint } from "../Projects/useCases/getProjects/endPoint";
import { getProjectByIdEndPoint } from "../Projects/useCases/getProjectsById/endPoint";
import express from "express";
import { createNewProjectEndPoint } from "../Projects/useCases/createProjects/endPoint";
import { addUserToProjectEndPoint } from "../Projects/useCases/addUserToProject/endpoint";

export default (router: express.Router) => {
  router.post("/projects", isAuthenticated, createNewProjectEndPoint);
  // // router.patch(
  // //   "/projects-users/:id",
  // //   isAuthenticated,
  // //   isOwnerProject,
  // //   updateUsers
  // // );
  // // router.patch("/projects-tasks/:id", isAuthenticated, updateTasks);
  router.put(
    "/projects/:id/users/add",
    isAuthenticated,
    isOwnerProject,
    addUserToProjectEndPoint
  );

  // router.delete(
  //   "/projects/:id",
  //   isAuthenticated,
  //   isOwnerProject,
  //   deleteProject
  // );
  // router.get("/projects/myprojects", isAuthenticated, getAllMyProjects);
  router.get("/projects/:id", isAuthenticated, getProjectByIdEndPoint);
  router.get("/projects", isAuthenticated, getAllProjectEndPoint);
};
