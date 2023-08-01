import express from "express";
import { AddUserToProject } from "./useCase";

const addUserToProject = new AddUserToProject();
export const addUserToProjectEndPoint = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new Error("missing Id");
    }
    if (!user) {
      throw new Error("missing user");
    }

    const myProject = await addUserToProject.addUserToProject(id, user);

    if (!myProject) {
      throw new Error("somethign went wrong");
    }

    return res.status(200).json(myProject);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
