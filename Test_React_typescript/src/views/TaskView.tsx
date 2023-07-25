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
  const [myProject, setMyProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksIds, setTasksIds] = useState<string[]>([]);
  const { setNotification } = useStateContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changes, setChanges] = useState<boolean>(false);

  useEffect(() => {
    getMyProject();
  }, [changes]);

  useEffect(() => {
    getTasks();
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
        console.log(myProjectRes.data.tasks);
      } else {
        setNotification("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
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
              <button onClick={toggleModal} className="btn btn-success">
                create new
              </button>
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
                <div className="col-md-4 mb-4" key={task._id}>
                  <div
                    className={`card ${
                      task.status === "ongoing"
                        ? "border-warning"
                        : task.status === "completed"
                        ? "border-success"
                        : "border-danger"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title fs-4">{task.title}</h5>
                      <p className="card-text fs-6">{task.desc}</p>
                      <p className="card-text fs-7">{task.user.userName}</p>
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
        show={showModal}
        onClose={toggleModal}
        myProject={myProject}
        setMyProject={setMyProject}
        setChanges={setChanges}
        changes={changes}
      />
    </div>
  );
};
