import express from "express";
import { ProjectsRepo } from "repositories/projects";
import { ProjectsClass } from "tld/entities/ProjectsClass";

export class GetAllProjects {
  readonly projectsRepo: ProjectsRepo;

  constructor() {
    this.projectsRepo = new ProjectsRepo();
  }

  public getAllProjects = (): Promise<ProjectsClass[]> => {
    return this.projectsRepo.getProjects();
  };
}
