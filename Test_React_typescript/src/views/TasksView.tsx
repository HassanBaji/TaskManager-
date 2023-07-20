import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import "../App.css";
import { InputFeild } from "../Components/InputFeild";
import { Todo } from "../model";
import { TodoList } from "../Components/TodoList";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../ContextProvider";
export const TasksView: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const { token, user, setUser } = useStateContext();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchUser = async () => {
        try {
          const response = await axiosClient.get(`/users/${token}`);
          setUser(response.data.username);
          setEmail(response.data.email);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (email != "") {
      const fetchTodo = async () => {
        try {
          const response = await axiosClient.get(`/todos/${email}`);
          setId(response.data._id);
          setTodos(response.data.tasks);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTodo();
    }
  }, [email]);

  const handelAdd = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleSaveChanges = async () => {
    if (!id) {
      if (todos.length != 0) {
        try {
          const response = await axiosClient.post("/todos", { email, todos });
          console.log("Save Changes Response:", response.data);
          // Optionally, you can update the state or show a success message here
        } catch (error) {
          console.error("Error saving changes:", error);
          // Optionally, you can show an error message here
        }
      }
    } else {
      if (todos.length != 0) {
        try {
          const response = await axiosClient.put(`/todos/${id}`, { todos });
          console.log("Save Changes Response:", response.data);
          // Optionally, you can update the state or show a success message here
        } catch (error) {
          console.error("Error saving changes:", error);
          // Optionally, you can show an error message here
        }
      } else {
        try {
          const response = await axiosClient.delete(`/todos/${id}`);
          console.log("Save Changes Response:", response.data);
          // Optionally, you can update the state or show a success message here
        } catch (error) {
          console.error("Error saving changes:", error);
          // Optionally, you can show an error message here
        }
      }
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">{user} Tasks</span>

      <InputFeild todo={todo} setTodo={setTodo} handelAdd={handelAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};
