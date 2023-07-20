import React from "react";
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setUnsavedChanges,
}) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          setTodos={setTodos}
          todos={todos}
          setUnsavedChanges={setUnsavedChanges}
        />
      ))}
    </div>
  );
};
