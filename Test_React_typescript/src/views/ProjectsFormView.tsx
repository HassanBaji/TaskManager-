import React, { useEffect, useState } from "react";
import { Project } from "../model";
import "../index.css";
import { useStateContext } from "../ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

export const ProjectsFormView: React.FC = () => {
  const [myProject, setMyProject] = useState<Project | any>();
  const [loading, setIsLoading] = useState<Boolean>();
  const [errors, setErrors] = useState<string | any>();
  const navigate = useNavigate();
  const { user, setNotification, setProjectsIds, projectsIds } =
    useStateContext();
  useEffect(() => {
    setMyProject({ ...myProject, owner: user?._id });
  }, []);
  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    try {
      const response = await axiosClient.post("/projects", myProject);
      if (response.status == 200) {
        const newProjectId = response.data._id; // Assuming the server returns the new projectId in the response
        console.log(newProjectId);
        // Add the new projectId to the projectsIds state
        if (projectsIds) {
          const updatedProjectsIds = [
            ...projectsIds,
            { projectId: newProjectId },
          ];
          setProjectsIds(updatedProjectsIds);

          const addProject = await axiosClient.patch(
            `/users-projects/${user?._id}`,
            { projects: updatedProjectsIds }
          );
          if (addProject.status == 200) {
            setNotification("succefully added new project");
            navigate("/projects");
          }
        }
      } else {
        setNotification("facing issues please try again later");
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div>
      <h1> New Project</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key: any) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              onChange={(ev) =>
                setMyProject({ ...myProject, name: ev.target.value })
              }
              placeholder="Name"
            />
            <input
              onChange={(ev) =>
                setMyProject({ ...myProject, desc: ev.target.value })
              }
              placeholder="Description"
            />

            <button className="btn btn-primary">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};
