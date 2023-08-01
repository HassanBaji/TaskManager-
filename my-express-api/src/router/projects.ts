import { isAuthenticated, isOwnerProject } from "../middlewares";
import // createNewProject,
// getAllMyProjects,
// deleteProject,
// getMyProject,
// updateProject,
// updateTasks,
// updateUsers,
"../controllers/projects";
import { getAllProjectEndPoint } from "../Projects/getProjects/endPoint";
import express from "express";

export default (router: express.Router) => {
  // router.post("/projects", isAuthenticated, createNewProject);
  // // router.patch(
  // //   "/projects-users/:id",
  // //   isAuthenticated,
  // //   isOwnerProject,
  // //   updateUsers
  // // );
  // // router.patch("/projects-tasks/:id", isAuthenticated, updateTasks);
  // router.put("/projects/:id", isAuthenticated, isOwnerProject, updateProject);

  // router.delete(
  //   "/projects/:id",
  //   isAuthenticated,
  //   isOwnerProject,
  //   deleteProject
  // );
  // router.get("/projects/myprojects", isAuthenticated, getAllMyProjects);
  // router.get("/projects/:id", isAuthenticated, getMyProject);
  router.get("/projects", isAuthenticated, getAllProjectEndPoint);
};
