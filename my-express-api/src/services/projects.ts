import express from "express";
//import { IProject } from "../tld/db/projects";
import { ProjectsRepo } from "../repositories/projects";
import { getUserById } from "../tld/db/users";
import { ProjectsClass } from "../tld/entities/ProjectsClass";

export class ProjectsServices {
  private projectsRepo: ProjectsRepo;

  constructor() {
    this.projectsRepo = new ProjectsRepo();
  }

  public getAllProjects = async (): Promise<ProjectsClass[]> => {
    return this.projectsRepo.getProjects();
  };

  public getProjectById = async (id: string): Promise<ProjectsClass> => {
    if (!id) {
      throw new Error("Call without Params");
    }
    const myProject = await this.projectsRepo.getMyProjectById(id);
    if (!myProject) {
      throw new Error("Project does not exist");
    }
    return myProject;
  };

  public creatProject = async (values: Record<string, any>) => {
    // if (!values.name) {
    //   throw new Error("missing name");
    // }
    // if (!values.owner) {
    //   throw new Error("missing owner");
    // }
    // if (!values.desc) {
    //   throw new Error("missing description");
    // }
    // const newProject: Pick<ProjectsClass, "name" & "owner" & "desc"> = {
    //   name: values.name,
    //   owner: values.owner._id,
    //   desc: values.desc,
    // };
    // const newProjectSaved = (
    //   await this.projectsRepo.createProject(newProject)
    // ).save();
    // const myUser = values.owner;
    // myUser.projects.push({ projectId: (await newProjectSaved)._id });
    // await myUser.save();
    // return newProjectSaved;
  };

  public getAllMyProjects = async (owner: any) => {
    // if (!owner) {
    //   throw new Error("something went wrong");
    // }
    // const myProjectsObj = owner.projects;
    // if (myProjectsObj.length === 0) {
    //   return;
    // }
    // let projectIds: string[] = myProjectsObj.map(
    //   (project: { projectId: string }) => project.projectId
    // );
    // const myProjectPromises: Promise<IProject>[] = projectIds.map((id) =>
    //   this.projectsRepo.getMyProjectById(id)
    // );
    // const myProjects: IProject[] = await Promise.all(myProjectPromises);
    // return myProjects;
  };

  public deleteProject = async (id: string, owner: any) => {
    // if (!id || !owner) {
    //   throw new Error("something went wrong");
    // }
    // const deletedProject = await this.projectsRepo.deleteProjectById(id);
    // if (!deletedProject) {
    //   throw new Error("the project you are trying to delete does not exist");
    // }
    // const myProjects = owner.projects;
    // if (!myProjects) {
    //   throw new Error("something went wrong");
    // }
    // const myNewProjects = myProjects.filter(
    //   (project: { projectId: string; _id: string }) => project.projectId !== id
    // );
    // owner.projects = myNewProjects;
    // await owner.save();
    // return deletedProject;
  };

  public updateProject = async (id: string, values: Record<string, any>) => {
    // if (!id) {
    //   throw new Error("something went wrong");
    // }
    // if (!values.name) {
    //   throw new Error("missing name");
    // }
    // if (!values.desc) {
    //   throw new Error("missing description");
    // }
    // if (!values.owner) {
    //   throw new Error("womething went wrong");
    // }
    // const updatedProject: Pick<IProject, "name" & "owner" & "desc"> = {
    //   name: values.name,
    //   owner: values.owner._id,
    //   desc: values.desc,
    // };
    // const updatedProjectSaved = await this.projectsRepo.updateProjectById(
    //   id,
    //   updatedProject
    // );
    // if (!updatedProjectSaved) {
    //   throw new Error("the project you are trying to update does not exist");
    // }
    // return updatedProjectSaved;
  };

  public addUser = async (id: string, userId: string) => {
    //   if (!id || !userId) {
    //     throw new Error("something went wrong");
    //   }
    //   const myProject = await this.projectsRepo.getMyProjectById(id);
    //   const myUser = await getUserById(userId);
    //   if (!myProject || !myUser) {
    //     throw new Error("the project or the user is missing");
    //   }
    //   const projUsers = myProject.users;
    //   projUsers.push({ userId: userId, userName: myUser.username });
    //   myProject.users = projUsers;
    //   await myProject.save();
    //   const userProj = myUser.projects;
    //   userProj.push({ projectId: id });
    //   myUser.projects = userProj;
    //   await myUser.save();
    //   return myProject;
    // };
  };
}
