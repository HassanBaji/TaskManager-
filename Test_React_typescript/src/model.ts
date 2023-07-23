export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface Project {
  id: string;
  name: string;
  desc: string;
  owner: string;
  users?: [{ userName: string; userId: string }];
  tasks?: [{ taskId: string }];
}

export interface Tasks {
  id: string;
  projectId: string;
  title: string;
  desc: string;
  status: string;
  user: { userId: string; userName: string };
}
