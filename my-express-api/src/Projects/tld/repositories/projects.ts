import express from "express";
import mongoose from "mongoose";
import { ProjectModel } from "../db/projects";
import { ProjectsClass } from "../entities/ProjectsClass";
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
        owner: project.owner,
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
      owner: myProject.owner,
      _id: myProject._id.toString(),
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

    const newProject = await new ProjectModel(myProjectToPersistent).save();
    const props: toDomainProps = {
      name: newProject.name,
      desc: newProject.desc,
      owner: newProject.desc,
      _id: newProject._id.toString(),
      tasks: newProject.tasks,
      users: newProject.users,
    };
    const newProjectSaved = this.projectMapper.toDomain(props);
    return newProjectSaved;
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

    const newProject = await ProjectModel.findByIdAndUpdate(
      id,
      myProjectToPersistent
    );

    const props: toDomainProps = {
      name: newProject.name,
      desc: newProject.desc,
      owner: newProject.desc,
      _id: newProject._id.toString(),
      tasks: newProject.tasks,
      users: newProject.users,
    };
    const newProjectSaved = this.projectMapper.toDomain(props);
    return newProjectSaved;
  };
}
