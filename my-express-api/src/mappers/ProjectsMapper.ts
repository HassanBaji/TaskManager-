import { ProjectsClass } from "../tld/entities/ProjectsClass";

export interface toDomainProps {
  name: string;
  desc: string;
  _id: string;
  users: { userId: string; userName: string }[];
  tasks: { taskId: string }[];
}

export class ProjectsMapper {
  public toDomain = (raw: toDomainProps): ProjectsClass => {
    return new ProjectsClass(raw.name, raw.desc, raw._id, raw.users, raw.tasks);
  };

  public toPersistent = (project: ProjectsClass) => {
    return {
      name: project.name,
      desc: project.desc,
      users: project.users,
      tasks: project.tasks,
    };
  };
}
