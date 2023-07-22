import mongoose from "mongoose";

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

export const ProjectModel = mongoose.model("project", ProjectsSchema);

export const getProjects = () => ProjectModel.find();
export const getMyProjectById = (id: string) => ProjectModel.findById(id);
export const createProject = (values: Record<string, any>) =>
  new ProjectModel(values).save();
export const deleteProjectById = (id: string) =>
  ProjectModel.findByIdAndDelete(id);
export const updateProjectById = (id: string, values: Record<string, any>) =>
  ProjectModel.findByIdAndUpdate(id, values);
