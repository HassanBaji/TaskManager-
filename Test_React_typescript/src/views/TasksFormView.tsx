import React, { useEffect, useState } from "react";
import { Project, Tasks, User } from "../model";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../ContextProvider";

const TasksFormView: React.FC<{
  usersIds?: string[];
  update: string;
  show: boolean;
  myTasky?: Tasks;
  setMyTasky?: React.Dispatch<React.SetStateAction<Tasks | undefined>>;
  onClose: () => void;
  myProject?: Project;
  setChanges: React.Dispatch<React.SetStateAction<boolean>>;
  changes: boolean;
  setMyProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
}> = ({
  show,
  onClose,
  myProject,
  setMyProject,
  setChanges,
  changes,
  usersIds = [],
  update,
  myTasky,
  setMyTasky,
}) => {
  const { id } = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    console.log(usersIds);
    try {
      console.log("here");
      const usersData = await Promise.all(
        usersIds.map(async (id: string) => {
          const response = await axiosClient.get(`/users-id/${id}`);
          return response.data;
        })
      );

      const myUser = await axiosClient
        .get(`/users-id/${myProject?.owner}`)
        .then((data) => {
          console.log(data.data);
          return data.data; // Return the myUser object
        });

      // Add myUser to the usersData array
      if (myUser) {
        usersData.push(myUser);
        setUsers(usersData); // Update the state with the updated usersData array
      }
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

              setMyTask({
                title: "",
                desc: "",
                status: "notStarted",
                user: {
                  userName: "",
                  userId: "",
                },
              });
              onClose();
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async () => {
    const status: string = myTask.status;

    const updatedRes = await axiosClient
      .patch(`/tasks-status/${myTasky?._id}`, { status })
      .then((data) => {
        setChanges(!changes);
        setNotification("task status updated successfully");
        onClose();
      });
  };
  const updateDetails = async () => {
    const title: string = myTask.title;
    const desc: string = myTask.desc;
    const user: { userId: string; userName: string } = myTask.user;
    const updatedRes = await axiosClient
      .patch(`/tasks-details/${myTasky?._id}`, { title, desc, user })
      .then((data) => {
        setChanges(!changes);
        setNotification("task status updated successfully");
        onClose();
      });
  };

  useEffect(() => {
    if (myTasky) {
      setMyTask(myTasky);
    }
    getUsers();
  }, [usersIds]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log("here");
    postTask();
  };

  const onUpdate = (ev: React.FormEvent) => {
    ev.preventDefault();
    updateStatus();
  };

  const onEdit = (ev: React.FormEvent) => {
    ev.preventDefault();
    updateDetails();
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
            {update == "add" && <h5 className="modal-title">New Task</h5>}
            {update == "edit" && (
              <h5 className="modal-title">Edit Task {myTask?.title}</h5>
            )}
            {update == "update" && (
              <h5 className="modal-title">Update Task {myTasky?.title}</h5>
            )}
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

            {update == "add" && (
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
            )}
            {update == "update" && (
              <form onSubmit={onUpdate}>
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    onChange={(ev) =>
                      setMyTask({ ...myTask, status: ev.target.value })
                    }
                    value={myTask.status}
                    className="form-control"
                  >
                    <option value="notStarted">Not started</option>
                    <option value="ongoing">On going</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            )}
            {update == "edit" && (
              <form onSubmit={onEdit}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksFormView;
