import express from "express";
import { GetProjectById } from "./useCase";

const getProjectById = new GetProjectById();
export const getProjectByIdEndPoint = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const myProject = await getProjectById.getProjectById(id);
    return res.status(200).json(myProject);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
