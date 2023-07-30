import {
  createTask,
  deleteByTaskId,
  getMyTaskById,
  getTasks,
} from "../tld/db/tasks";
import express from "express";

export const getAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allTasks = await getTasks();

    if (!allTasks) {
      return res.sendStatus(204);
    }
    return res.status(200).json(allTasks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getMytask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const myTask = await getMyTaskById(id);
    if (!myTask) {
      return res.sendStatus(404);
    }

    return res.status(200).json(myTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNewTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, desc, status, user } = req.body;
    const { id } = req.params;
    if (!id || !title || !desc || !status || !user) {
      return res.sendStatus(400);
    }

    const newTask = await createTask({
      projectId: id,
      title: title,
      desc: desc,
      status: status,
      user: {
        userName: user.userName,
        userId: user.userId,
      },
    });

    return res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTaskStatus = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !id) {
      return res.sendStatus(400);
    }

    const myTask = await getMyTaskById(id);

    if (!myTask) {
      return res.sendStatus(404);
    }

    myTask.status = status;
    myTask.save();
    return res.status(200).json(myTask).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTaskDetails = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, desc, user } = req.body;

    if (!title || !desc || !user || !id) {
      return res.sendStatus(400);
    }
    const myTask = await getMyTaskById(id);

    if (!myTask) {
      return res.sendStatus(404);
    }

    myTask.title = title;
    myTask.desc = desc;
    myTask.user = { userId: user.userId, userName: user.userName };
    myTask.save();
    return res.status(200).json(myTask).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }

    const deletedTask = await deleteByTaskId(id);
    if (!deletedTask) {
      return res.sendStatus(404);
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
