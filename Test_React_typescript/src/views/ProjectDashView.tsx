import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../model";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { Link, useNavigate } from "react-router-dom";

interface StateContextProps {
  // ... other properties ...
  setProjectsIds: (projects: { projectId: string }[] | null) => void;
}

export const ProjectDashView = () => {
  const { id } = useParams();
  const [myProject, setMyProject] = useState<Project>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setNotification, user, setProjectsIds, projectsIds } =
    useStateContext();
  const navigate = useNavigate();

  const getMyProject = async () => {
    try {
      const myProjectRes = await axiosClient.get(`/projects/${id}`);
      if (myProjectRes.status == 200) {
        setMyProject(myProjectRes.data);
        setLoading(false);
      } else {
        setNotification("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProject();
    if (myProject?.owner == user?._id) {
      setIsOwner(true);
    }
  }, [isOwner]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    const deleteProj = await axiosClient.delete(`/projects/${id}`);
    if (deleteProj.status == 200) {
      const newProjectIds = projectsIds?.filter(
        (project) => project.projectId !== id
      );
      if (newProjectIds) {
        setProjectsIds(newProjectIds);
      }

      const addProject = await axiosClient.patch(
        `/users-projects/${user?._id}`,
        { projects: newProjectIds }
      );
      if (addProject.status == 200) {
        setNotification("succefully delted project");
        navigate("/projects");
      }
    } else {
      setNotification("facing issues please try again later");
    }
  };

  const goToTasks = () => {
    navigate(`/tasks/${id}`);
  };

  const goToUsers = () => {
    navigate(`/users/${id}`);
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
        <h1>{myProject?.name}</h1>
        {isOwner && (
          <div>
            <Link to={`/projects/edit/${id}`} className="btn btn-warning">
              Edit
            </Link>
            &nbsp;
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
      {loading && <div className="text-center">Loading</div>}
      {!loading && (
        <div className="card">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                className="card border-success"
                style={{ cursor: "pointer" }}
                onClick={() => goToTasks()}
              >
                <div className="card-body">
                  <h5 className="card-title">Tasks</h5>
                  <p className="card-text">{myProject?.tasks?.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div
                className="card border-success"
                style={{ cursor: "pointer" }}
                onClick={() => goToUsers()}
              >
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">{myProject?.users?.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
