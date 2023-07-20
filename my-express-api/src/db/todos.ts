import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  tasks: [
    {
      id: { type: String, required: true },
      todo: { type: String, required: true },
      isDone: { type: Boolean, required: true },
    },
  ],
});

export const TodoModel = mongoose.model("todo", TodoSchema);

export const getMyTodosById = (id: string) => TodoModel.findById(id);
export const createNewTodos = (values: Record<string, any>) =>
  new TodoModel(values).save().then((todo) => todo.toObject());
export const deleteTodosById = (id: string) => TodoModel.findByIdAndDelete(id);
export const updateTodosById = (id: string, values: Record<string, any>) =>
  TodoModel.findByIdAndUpdate(id, values);
