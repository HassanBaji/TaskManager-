// // import {
// //   getMyProjectById,
// //   createProject,
// //   deleteProjectById,
// //   updateProjectById,
// //   getProjects,
// // } from "../db/projects";
// import { ProjectsServices } from "../services/projects";
// import express from "express";
// import { get } from "lodash";

// const projectService: ProjectsServices = new ProjectsServices();

// export const getAllProjects = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const allProjects = await projectService.getAllProjects();
//     return res.status(200).json(allProjects);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };

// export const getMyProject = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.params;
//     const project = await projectService.getProjectById(id);
//     return res.status(200).json(project);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: error.message });
//   }
// };

// export const createNewProject = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { name, desc } = req.body;
//     const owner = get(req, "identity");
//     const newProject = await projectService.creatProject({ owner, name, desc });

//     return res.status(200).json(newProject);
//   } catch (error) {
//     console.error("error " + error);
//     return res.status(400).json({ error: error.message });
//   }
// };

// export const getAllMyProjects = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   //   try {
//   //     const owner = get(req, "identity");
//   //     const myProjects = await projectService.getAllMyProjects(owner);
//   //     if (!myProjects) {
//   //       return res.status(404).json({ message: "no projects found" });
//   //     }
//   //     return res.status(200).json(myProjects);
//   //   } catch (error) {
//   //     console.log(error);
//   //     return res.sendStatus(400);
//   //   }
//   // };
//   // export const addUser = async (req: express.Request, res: express.Response) => {
//   //   try {
//   //     const { id } = req.params;
//   //     const { users } = req.body;
//   //     if (!id || !users) {
//   //       console.log("heres");
//   //       return res.sendStatus(400);
//   //     }
//   //     const myProject = await getMyProjectById(id);
//   //     if (!myProject) {
//   //       console.log("here");
//   //       return res.sendStatus(400);
//   //     }
//   //     myProject.users = users.map(
//   //       (user: { userId: string; userName: string }) => ({
//   //         userId: user.userId,
//   //         userName: user.userName,
//   //       })
//   //     );
//   //     await myProject.save();
//   //     return res.status(200).json(myProject).end;
//   //   } catch (error) {
//   //     console.log(error);
//   //     return res.sendStatus(400);
//   //   }
// };

// // export const updateTasks = async (
// //   req: express.Request,
// //   res: express.Response
// // ) => {
// //   try {
// //     const { id } = req.params;
// //     const { tasks } = req.body;

// //     if (!id || !tasks) {
// //       return res.sendStatus(400);
// //     }

// //     const myProject = await getMyProjectById(id);

// //     if (!myProject) {
// //       return res.sendStatus(400);
// //     }

// //     myProject.tasks = tasks.map((task: { taskId: string }) => ({
// //       taskId: task.taskId,
// //     }));

// //     await myProject.save();
// //     return res.status(200).json(myProject).end;
// //   } catch (error) {
// //     console.log(error);
// //     return res.sendStatus(400);
// //   }
// // };

// export const deleteProject = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.params;
//     const owner = get(req, "identity");

//     const deletedProject = await projectService.deleteProject(id, owner);

//     return res.status(200).json(deletedProject);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: error.message });
//   }
// };

// export const updateProject = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.params;
//     const { name, desc } = req.body;
//     const owner = get(req, "identity");

//     if (!owner || !name || !desc || !id) {
//       return res.sendStatus(400);
//     }
//     const updatedProject = await projectService.updateProject(id, {
//       owner: owner,
//       name: name,
//       desc: desc,
//     });

//     return res.status(200).json(updatedProject).end();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: error });
//   }
// };
