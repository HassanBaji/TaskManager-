import { ObjectId } from "mongoose";
import { ProjectsClass } from "../entities/ProjectsClass";

export interface toDomainProps {
  name: string;
  desc: string;
  owner: string;
  _id?: string;
  users?: { userId: string; userName: string }[];
  tasks?: { taskId: string }[];
}

export interface toDtoProps {
  name: string;
  desc: string;
  owner: string;
}

export class ProjectsMapper {
  public toDomain = (raw: toDomainProps): ProjectsClass => {
    if (raw.name.length < 3) {
      throw new Error("name should be at least 3 charecters ");
    }
    if (raw.desc.length < 3) {
      throw new Error("description should be at least 3 charecters ");
    }

    return new ProjectsClass(
      raw.name,
      raw.desc,
      raw.owner,
      raw._id,
      raw.users?.map((user: { userId: string; userName: string }) => ({
        userId: user.userId,
        userName: user.userName,
      })) ?? [],
      raw.tasks?.map((task: { taskId: string }) => ({
        taskId: task.taskId,
      })) ?? []
    );
  };

  public toDto = (raw: toDtoProps) => {
    if (raw.name.length < 2) {
      throw new Error("name should be at least 3 charecters ");
    }
    if (raw.desc.length < 2) {
      throw new Error("description should be at least 3 charecters ");
    }
    return new ProjectsClass(raw.name, raw.desc, raw.owner);
  };

  public toPersistent = (project: ProjectsClass) => {
    return {
      name: project.name,
      desc: project.desc,
      owner: project.owner,
      users: project.users,
      tasks: project.tasks,
    };
  };
}
