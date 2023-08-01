import { deleteUser } from "../../../controllers/users";
import z from "zod";

export class ProjectsClass {
  readonly id: String;
  readonly name: string;
  readonly desc: string;
  readonly owner: string;
  public users: { userName: string; userId: string }[];
  public tasks: { taskId: string }[];

  constructor(
    name: string,
    desc: string,
    owner: string,
    _id?: string,
    users?: { userName: string; userId: string }[],
    tasks?: { taskId: string }[]
  ) {
    this.id = _id ?? "0";
    this.name = name;
    this.desc = desc;
    this.owner = owner;
    this.tasks = tasks ?? [];
    this.users = users ?? [];
  }

  public addUser(user: { userName: string; userId: string }) {
    this.users.push(user);
  }

  public deleteUser(id: string) {
    const myUser = this.users.find((user) => user.userId === id);
    if (myUser) {
      const newUsers = this.users.filter((user) => user.userId !== id);
      this.users = newUsers;
    } else {
      throw new Error("the user you are trying to delete does not exist");
    }
  }

  public addTask(task: { taskId: string }) {
    this.tasks.push(task);
  }

  public deleteTask(id: string) {
    const myTask = this.tasks.find((task) => task.taskId === id);
    if (myTask) {
      const newTasks = this.tasks.filter((task) => {
        task.taskId !== id;
      });
    } else {
      throw new Error("the task you are trying to delete does not exist");
    }
  }
}
