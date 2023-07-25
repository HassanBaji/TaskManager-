import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Tasks, Project } from "../model";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import TasksFormView from "./TasksFormView";

export const TaskView = () => {
  const { id } = useParams();
  const [myTasks, setMyTasks] = useState<Tasks[]>([]);
  const [myTask, setMyTask] = useState<Tasks>();
  const [myProject, setMyProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksIds, setTasksIds] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [usersIds, setUsersIds] = useState<string[]>([]);
  const { setNotification, user } = useStateContext();
  const navigate = useNavigate();
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [changes, setChanges] = useState<boolean>(false);

  useEffect(() => {
    getMyProject();
  }, [changes]);

  useEffect(() => {
    getTasks();
    if (myProject?.owner == user?._id) {
      setIsOwner(true);
    }
  }, [myProject]);

  const getTasks = async () => {
    setLoading(true);
    try {
      console.log("here");
      const tasksData = await Promise.all(
        tasksIds.map(async (tasks: string) => {
          const response = await axiosClient.get(`/tasks/${tasks}`);
          return response.data;
        })
      );
      setMyTasks(tasksData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyProject = async () => {
    try {
      const myProjectRes = await axiosClient.get(`/projects/${id}`);
      if (myProjectRes.status == 200) {
        setMyProject(myProjectRes.data);
        setTasksIds(
          myProjectRes.data.tasks.map((task: { taskId: string }) => task.taskId)
        );
        setUsersIds(
          myProjectRes.data.users.map((user: { userId: string }) => user.userId)
        );
        console.log(myProjectRes.data.tasks);
        console.log(myProjectRes.data.users);
      } else {
        setNotification("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModalAdd = () => {
    setShowModalAdd((prevState) => !prevState);
  };
  const toggleModalEdit = () => {
    setShowModalEdit((prevState) => !prevState);
  };
  const toggleModalUpdate = () => {
    setShowModalUpdate((prevState) => !prevState);
  };

  const handleDelete = async (taskId: any) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    console.log(myTasks);
    const newTasksRemoved = myTasks.filter((task) => task._id != taskId);

    setMyTasks(newTasksRemoved);
    const tasksObj = newTasksRemoved.map((task) => ({
      taskId: task._id,
    }));
    console.log(tasksObj);

    const updateProjectTaskRes = await axiosClient
      .patch(`/projects-tasks/${id}`, { tasks: tasksObj })
      .then((data) => {
        setNotification("task deleted succefully");
        setLoading(false);
        setChanges(!changes);
      });
  };

  const handleUpdate = (taskId: any) => {
    const myTask = myTasks.find((task) => task._id == taskId);
    setMyTask(myTask);
    if (myTask) {
      toggleModalUpdate();
    }
  };

  const handleEdit = (taskId: any) => {
    const myTask = myTasks.find((task) => task._id == taskId);
    setMyTask(myTask);
    if (myTask) {
      toggleModalEdit();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {myProject && !loading && (
          <>
            <h1>{myProject?.name} Tasks</h1>
            <div>
              <Link
                to={`/projects/dash/${id}`}
                replace
                className="btn btn-primary"
              >
                Back
              </Link>
              &nbsp;
              {isOwner && (
                <button onClick={toggleModalAdd} className="btn btn-success">
                  create new
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <div>
          {loading && <div className="text-center">Loading</div>}

          {!loading && myTasks && (
            <div className="row">
              {myTasks?.map((task) => (
                <div className="col-md-4 mb-6" key={task._id}>
                  <div
                    className={`card ${
                      task.status === "ongoing"
                        ? "border-warning"
                        : task.status === "completed"
                        ? "border-success"
                        : "border-danger"
                    } border-3`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body ">
                      <h5 className="card-title fs-5">{task.title}</h5>
                      <p className="card-text fs-4">{task.desc}</p>
                      <p className="card-text fw-bold fs-7">
                        {task.user.userName}
                      </p>
                      <div className="container text-center">
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => handleUpdate(task._id)}
                        >
                          Update Status
                        </button>
                        <button
                          className="btn btn-warning m-2"
                          onClick={() => handleEdit(task._id)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="btn btn-danger m-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!myTasks && !loading && <div>No Tasks Found</div>}
      </div>
      <TasksFormView
        update={"add"}
        show={showModalAdd}
        onClose={toggleModalAdd}
        myProject={myProject}
        setMyProject={setMyProject}
        setChanges={setChanges}
        changes={changes}
        usersIds={usersIds}
      />
      <TasksFormView
        update={"edit"}
        show={showModalEdit}
        onClose={toggleModalEdit}
        myProject={myProject}
        setMyProject={setMyProject}
        setChanges={setChanges}
        changes={changes}
        usersIds={usersIds}
        myTasky={myTask}
      />
      <TasksFormView
        myTasky={myTask}
        update={"update"}
        show={showModalUpdate}
        onClose={toggleModalUpdate}
        myProject={myProject}
        setMyProject={setMyProject}
        setChanges={setChanges}
        changes={changes}
        usersIds={usersIds}
        setMyTasky={setMyTask}
      />
    </div>
  );
};
