import express from "express";
import { get } from "lodash";
import { CreateNewProject } from "./useCase";
import { ProjectsMapper } from "../../tld/mappers/ProjectsMapper";

const createNewProject = new CreateNewProject();

export const createNewProjectEndPoint = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, desc } = req.body;
    const owner = get(req, "identity._id" as string);

    if (!name) {
      throw new Error("name missing");
    }
    if (!desc) {
      throw new Error("description missing");
    }
    if (!owner) {
      throw new Error("something went wrong");
    }

    const createdProject = await createNewProject.createNewProject(
      name,
      desc,
      owner
    );
    if (createdProject) {
      return res.status(200).json(createdProject);
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
