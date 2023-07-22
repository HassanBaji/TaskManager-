import { getMyProjectById, createProject } from "../db/projects";
import express, { response } from "express";

export const getMyProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }
    const project = await getMyProjectById(id);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNewProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { owner, name, desc, users, tasks } = req.body;

    if (!owner || !name || !desc) {
      return res.sendStatus(400);
    }

    const newProject = await createProject({
      owner: owner,
      name: name,
      desc: desc,
      tasks: tasks.map((task: { taskId: string }) => ({
        taskId: task.taskId,
      })),

      users: users.map((user: { userId: string; userName: string }) => ({
        userId: user.userId,
        userName: user.userName,
      })),
    });

    return res.status(200).json(newProject);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};
