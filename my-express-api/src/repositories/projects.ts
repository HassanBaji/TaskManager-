import express from "express";
import mongoose from "mongoose";
import { ProjectModel } from "../tld/db/projects";
import { ProjectsClass } from "../tld/entities/ProjectsClass";
import { ProjectsMapper, toDomainProps } from "../mappers/ProjectsMapper";

export class ProjectsRepo {
  projectMapper: ProjectsMapper;

  constructor() {
    this.projectMapper = new ProjectsMapper();
  }

  public getProjects = async (): Promise<ProjectsClass[]> => {
    const myProjects = await ProjectModel.find();
    const myProjectsArray: ProjectsClass[] = myProjects.map((project: any) => {
      const projectProps: toDomainProps = {
        name: project.name,
        desc: project.desc,
        _id: project._id,
        tasks: project.tasks,
        users: project.users,
      };
      return this.projectMapper.toDomain(projectProps);
    });
    return myProjectsArray;
  };

  public getMyProjectById = (id: string): Promise<ProjectsClass | null> => {
    return ProjectModel.findById(id);
  };
  public createProject = async (
    values: ProjectsClass
  ): Promise<ProjectsClass> => new ProjectModel(values).save();

  public deleteProjectById = async (
    id: string
  ): Promise<ProjectsClass | null> => {
    return ProjectModel.findByIdAndDelete(id);
  };

  public updateProjectById = async (
    id: string,
    values: ProjectsClass
  ): Promise<ProjectsClass | null> =>
    ProjectModel.findByIdAndUpdate(id, values);
}
