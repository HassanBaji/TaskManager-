import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
  projetcId: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true },
});

export const TasksModel = mongoose.model("task", TasksSchema);

export const getTasks = () => TasksModel.find();
export const getMyTaskById = (id: string) => TasksModel.findById(id);
export const createTask = (values: Record<string, any>) =>
  new TasksModel(values).save();
export const deleteByTaskId = (id: string) => TasksModel.findByIdAndDelete(id);
export const updateByTaskId = (id: string, values: Record<string, any>) =>
  TasksModel.findByIdAndUpdate(id, values);
