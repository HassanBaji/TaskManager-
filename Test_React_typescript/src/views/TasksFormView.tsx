import React, { useEffect, useState } from "react";
import { Project, Tasks } from "../model";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../ContextProvider";

const TasksFormView: React.FC<{
  show: boolean;
  onClose: () => void;
  myProject?: Project;
  setChanges: React.Dispatch<React.SetStateAction<boolean>>;
  changes: boolean;
  setMyProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
}> = ({ show, onClose, myProject, setMyProject, setChanges, changes }) => {
  const { id } = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const { setNotification } = useStateContext();
  const [tasks, setMyTasks] = useState<Tasks[] | any[]>([]);
  const [myTask, setMyTask] = useState<Tasks | any>({
    title: "",
    desc: "",
    status: "notStarted",
    user: {
      userName: "",
      userId: "",
    },
  });
  const [users, setUsers] = useState<any[]>([]);
  const [myUser, setMyUser] = useState<{ userName: string; userId: string }>({
    userName: "",
    userId: "",
  });

  const getUsers = async () => {
    try {
      const usersResponse = await axiosClient.get("users");
      setUsers(usersResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postTask = async () => {
    try {
      console.log("lol");
      const postedTask = await axiosClient
        .post(`/tasks/${id}`, myTask)
        .then((data) => {
          const myNewTask = data.data;
          console.log(myNewTask);
          const allTasks = myProject?.tasks?.map(
            (task: { taskId: string }) => ({
              taskId: task.taskId,
            })
          );

          allTasks?.push({ taskId: myNewTask._id });

          const postTaskToProject = axiosClient
            .patch(`projects-tasks/${id}`, { tasks: allTasks })
            .then((data) => {
              setChanges(!changes);
              setNotification("task added successfully");
              onClose();
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log("here");
    postTask();
  };

  return (
    <div
      className={`modal ${show ? "d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {id ? "Edit Project" : "New Project"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  onChange={(ev) =>
                    setMyTask({ ...myTask, title: ev.target.value })
                  }
                  value={myTask?.title}
                  className="form-control"
                  placeholder="Enter Task title"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  onChange={(ev) =>
                    setMyTask({ ...myTask, desc: ev.target.value })
                  }
                  value={myTask?.desc}
                  className="form-control"
                  placeholder="Enter project description"
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  onChange={(ev) =>
                    setMyTask({ ...myTask, status: ev.target.value })
                  }
                  value={myTask?.status}
                  className="form-control"
                >
                  <option value="notStarted">Not started</option>
                  <option value="ongoing">On going</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>User:</label>
                <select
                  onChange={(ev) =>
                    setMyTask({
                      ...myTask,
                      user: {
                        userName: ev.target.value,
                        userId:
                          ev.target.options[
                            ev.target.selectedIndex
                          ].getAttribute("data-key"),
                      },
                    })
                  }
                  value={myTask?.user ? myTask?.user.userName : ""}
                  className="form-control"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option
                      key={user._id}
                      value={user.username}
                      data-key={user._id}
                    >
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksFormView;
