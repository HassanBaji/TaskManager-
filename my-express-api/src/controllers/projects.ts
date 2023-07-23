import {
  getMyProjectById,
  createProject,
  deleteProjectById,
  updateProjectById,
  getProjects,
} from "../db/projects";
import express from "express";

export const getAllProjects = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allProject = await getProjects();
    return res.status(200).json(allProject);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

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
      //   tasks: tasks.map((task: { taskId: string }) => ({
      //     taskId: task.taskId,
      //   })),

      //   users: users.map((user: { userId: string; userName: string }) => ({
      //     userId: user.userId,
      //     userName: user.userName,
      //   })),
    });

    return res.status(200).json(newProject);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { users } = req.body;

    if (!id || !users) {
      console.log("heres");
      return res.sendStatus(400);
    }

    const myProject = await getMyProjectById(id);

    if (!myProject) {
      console.log("here");
      return res.sendStatus(400);
    }

    myProject.users = users.map(
      (user: { userId: string; userName: string }) => ({
        userId: user.userId,
        userName: user.userName,
      })
    );

    await myProject.save();
    return res.status(200).json(myProject).end;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { tasks } = req.body;

    if (!id || !tasks) {
      return res.sendStatus(400);
    }

    const myProject = await getMyProjectById(id);

    if (!myProject) {
      return res.sendStatus(400);
    }

    myProject.tasks = tasks.map((task: { taskId: string }) => ({
      taskId: task.taskId,
    }));

    await myProject.save();
    return res.status(200).json(myProject).end;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const deletedProject = await deleteProjectById(id);
    return res.status(200).json(deletedProject);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { owner, name, desc } = req.body;

    if (!owner || !name || !desc || !id) {
      return res.sendStatus(400);
    }

    const updatedProject = await updateProjectById(id, {
      owner: owner,
      name: name,
      desc: desc,
    });

    return res.status(200).json(updatedProject).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
