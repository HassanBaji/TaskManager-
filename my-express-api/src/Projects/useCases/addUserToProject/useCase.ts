import { ProjectsMapper } from "../../../Projects/tld/mappers/ProjectsMapper";
import { ProjectsRepo } from "../../../Projects/tld/repositories/projects";
import express from "express";

export class AddUserToProject {
  readonly projectRepo: ProjectsRepo;
  readonly projectMapper: ProjectsMapper;

  constructor() {
    this.projectRepo = new ProjectsRepo();
    this.projectMapper = new ProjectsMapper();
  }

  public addUserToProject = async (
    id: string,
    user: { userName: string; userId: string }
  ) => {
    if (!user) {
      throw new Error("no user");
    }
    if (!id) {
      throw new Error("no Id was passed");
    }

    const myProject = await this.projectRepo.getMyProjectById(id);

    if (!myProject) {
      throw new Error("the project you are looking for does not exist");
    }

    myProject.addUser(user);
    const myProjectSaved = await this.projectRepo.updateProjectById(
      id,
      myProject
    );
    if (!myProjectSaved) {
      throw new Error("unexpected");
    }
    return myProjectSaved;
  };
}
