import express from "express";
import { IProject } from "db/projects";
import { ProjectsRepo } from "repositories/projects";

export class ProjectsServices {
  private projectsRepo: ProjectsRepo;

  constructor() {
    this.projectsRepo = new ProjectsRepo();
  }

  public getAllProjects = async (): Promise<IProject[]> => {
    return this.projectsRepo.getProjects();
  };

  public getProjectById = async (id: string): Promise<IProject> => {
    if (!id) {
      throw new Error("Call without Params");
    }
    return this.projectsRepo.getMyProjectById(id);
  };

  public creatProject = async (values: Omit<IProject, "users" & "tasks">) => {
    if (!values.name) {
      throw new Error("missing name");
    }
    if (!values.owner) {
      throw new Error("missing owner");
    }
    if (!values.desc) {
      throw new Error("missing description");
    }

    const newProject: Pick<IProject, "name" & "owner" & "desc"> = {
      name: values.name,
      owner: values.desc,
      desc: values.desc,
    };

    const newProjectSaved = (
      await this.projectsRepo.createProject(newProject)
    ).save();
    return newProjectSaved;
  };
}
