import express from "express";
import { GetAllProjects } from "./useCase";

const getAllProjects = new GetAllProjects();

export const getAllProjectEndPoint = async (
  req: express.Request,
  res: express.Response
) => {
  const myProjects = await getAllProjects.getAllProjects();
  res.status(200).json(myProjects);
};
