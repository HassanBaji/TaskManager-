import express from "express";
import { ProjectsRepo } from "../../tld/repositories/projects";
import { ProjectsClass } from "../../tld/entities/ProjectsClass";

export class GetProjectById {
  readonly projectsRepo: ProjectsRepo;

  constructor() {
    this.projectsRepo = new ProjectsRepo();
  }

  public getProjectById = async (id: string) => {
    if (!id) {
      throw new Error("id is missing");
    }
    try {
      const myProject = await this.projectsRepo.getMyProjectById(id);
      return myProject;
    } catch (error) {
      throw new Error("something unexpected");
    }
  };
}
