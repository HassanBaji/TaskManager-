import express from "express";
import { ProjectsRepo } from "../../repositories/projects";
import { ProjectsClass } from "../../tld/entities/ProjectsClass";

export class GetAllProjects {
  readonly projectsRepo: ProjectsRepo;

  constructor() {
    this.projectsRepo = new ProjectsRepo();
  }

  public getAllProjects = async (): Promise<ProjectsClass[]> => {
    return await this.projectsRepo.getProjects();
  };
}
