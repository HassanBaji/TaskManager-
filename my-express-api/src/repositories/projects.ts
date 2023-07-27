import express from "express";
import mongoose from "mongoose";
import { ProjectModel, IProject } from "../db/projects";

export class ProjectsRepo {
  public getProjects = async (): Promise<IProject[]> => ProjectModel.find();

  public getMyProjectById = (id: string): Promise<IProject | null> =>
    ProjectModel.findById(id);

  public createProject = async (
    values: Pick<IProject, "name" & "owner" & "desc">
  ): Promise<IProject> => new ProjectModel(values).save();

  public deleteProjectById = async (id: string): Promise<IProject | null> => {
    return ProjectModel.findByIdAndDelete();
  };

  public updateProjectById = async (
    id: string,
    values: IProject
  ): Promise<IProject | null> => ProjectModel.findByIdAndUpdate(id, values);
}
