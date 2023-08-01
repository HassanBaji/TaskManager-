import express from "express";
import mongoose from "mongoose";
import { ProjectModel } from "../tld/db/projects";
import { ProjectsClass } from "../tld/entities/ProjectsClass";
import { ProjectsMapper, toDomainProps } from "../mappers/ProjectsMapper";
import tasks from "router/tasks";

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

  public getMyProjectById = async (
    id: string
  ): Promise<ProjectsClass | null> => {
    const myProject = await ProjectModel.findById(id);
    const projectProps: toDomainProps = {
      name: myProject.name,
      desc: myProject.desc,
      _id: myProject.id,
      tasks: myProject.tasks,
      users: myProject.users,
    };
    const myProjectClass: ProjectsClass =
      this.projectMapper.toDomain(projectProps);
    return myProjectClass;
  };
  public createProject = async (
    values: ProjectsClass
  ): Promise<ProjectsClass> => {
    const myProjectToPersistent = this.projectMapper.toPersistent(values);

    return await new ProjectModel(myProjectToPersistent).save();
  };

  public deleteProjectById = async (
    id: string
  ): Promise<ProjectsClass | null> => {
    return await ProjectModel.findByIdAndDelete(id);
  };

  public updateProjectById = async (
    id: string,
    values: ProjectsClass
  ): Promise<ProjectsClass | null> => {
    const myProjectToPersistent = this.projectMapper.toPersistent(values);

    return await ProjectModel.findByIdAndUpdate(id, myProjectToPersistent);
  };
}
