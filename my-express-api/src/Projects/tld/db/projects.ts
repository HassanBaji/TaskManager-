import { ProjectsClass } from "Projects/tld/entities/ProjectsClass";
import mongoose from "mongoose";
import z from "zod";

const ProjectsSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  users: [
    {
      userId: { type: String },
      userName: { type: String },
    },
  ],
  tasks: [{ taskId: { type: String } }],
});

export const ProjectModel = mongoose.model<ProjectsClass>(
  "project",
  ProjectsSchema
);
