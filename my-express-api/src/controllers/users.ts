import express from "express";
import {
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  getUserBySessionToken,
} from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUsers();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserFromId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserFromSessionToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.sendStatus(400);
    }
    const user = await getUserBySessionToken(token);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const myUser = await getUserById(id);

    if (!myUser) {
      return res.sendStatus(400);
    }

    myUser.username = username;
    await myUser.save();

    return res.status(200).json(myUser).end();
  } catch (errors) {
    console.log(errors);
    return res.sendStatus(400);
  }
};

export const addProjectToUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { projects } = req.body;

    if (!id || !projects) {
      return res.sendStatus(400);
    }

    const myUser = await getUserById(id);

    if (!myUser) {
      return res.sendStatus(404);
    }

    myUser.projects = projects.map((proj: { projectId: string }) => ({
      projectId: proj.projectId,
    }));
    await myUser.save();

    return res.status(200).json(myUser).end;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
