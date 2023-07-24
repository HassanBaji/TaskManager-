export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface Project {
  _id?: string;
  name: string;
  desc: string;
  owner: string;
  users?: { userName: string; userId: string }[];
  tasks?: { taskId: string }[];
}

export interface Tasks {
  _id: string;
  projectId: string;
  title: string;
  desc: string;
  status: string;
  user: { userId: string; userName: string };
}
