import express from "express";
import { ProjectsRepo } from "../../tld/repositories/projects";
import { ProjectsClass } from "../../tld/entities/ProjectsClass";
import {
  ProjectsMapper,
  toDomainProps,
  toDtoProps,
} from "../../tld/mappers/ProjectsMapper";

export class CreateNewProject {
  readonly projectRepo: ProjectsRepo;
  readonly projectMapper: ProjectsMapper;

  constructor() {
    this.projectRepo = new ProjectsRepo();
    this.projectMapper = new ProjectsMapper();
  }

  public createNewProject = async (
    name: string,
    desc: string,
    owner: string
  ) => {
    try {
      if (!name) {
        throw new Error("name missing");
      }
      if (!desc) {
        throw new Error("missing description");
      }
      if (!owner) {
        throw new Error("missing Owner");
      }
      const props: toDomainProps = { name, desc, owner };
      const myProject = this.projectMapper.toDomain(props);
      const myProjectSaved = await this.projectRepo.createProject(myProject);
      if (myProjectSaved) {
        return myProjectSaved;
      } else {
        throw new Error("unexpected");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
