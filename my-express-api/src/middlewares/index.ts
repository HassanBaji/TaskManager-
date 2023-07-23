import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";
import { getMyProjectById } from "../db/projects";
import { getMyTaskById } from "../db/tasks";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    //console.log(get(req, "identity._id"));

    if (!currentUserId) {
      console.log("no current USER ID");
      return res.sendStatus(403);
    }

    if (currentUserId != id) {
      return res.sendStatus(400);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwnerTodos = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity.email") as string;
    //console.log(get(req, "identity._id"));

    if (!currentUserId) {
      console.log("no current USER ID");
      return res.sendStatus(403);
    }

    if (currentUserId != id) {
      return res.sendStatus(400);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["AUTH-TOKEN"];

    if (!sessionToken) {
      console.log("wtf");
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    console.log("THIS IS MY USER " + existingUser);

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwnerProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    //console.log(get(req, "identity._id"));

    if (!currentUserId) {
      console.log("no current USER ID");
      return res.sendStatus(403);
    }
    if (!id) {
      return res.sendStatus(400);
    }

    const myProject = await getMyProjectById(id);
    const ownerId = myProject.owner;

    if (currentUserId != ownerId) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isPartOfProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { prodId } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    //console.log(get(req, "identity._id"));

    if (!currentUserId) {
      console.log("no current USER ID");
      return res.sendStatus(403);
    }
    if (!prodId) {
      return res.sendStatus(400);
    }

    const myProject = await getMyProjectById(prodId);
    const users = myProject.users;

    const userInProject = users.some((user) => user.userId == currentUserId);

    if (!userInProject) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isPartOfProjectFromTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    //console.log(get(req, "identity._id"));

    if (!currentUserId) {
      console.log("no current USER ID");
      return res.sendStatus(403);
    }
    if (!id) {
      return res.sendStatus(400);
    }

    const myTask = await getMyTaskById(id);
    const myProject = await getMyProjectById(myTask.projectId);
    const users = myProject.users;

    const userInProject = users.some((user) => user.userId == currentUserId);
    const userIsOwner = myProject.owner == currentUserId;
    console.log(myProject.owner);
    console.log(currentUserId);
    if (!userInProject && !userIsOwner) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
