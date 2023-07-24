import React, { useState } from "react";
import { Project } from "../model";
import "../index.css";
import { useStateContext } from "../ContextProvider";
import axiosClient from "../axios-client";

export const ProjectsFormView: React.FC = () => {
  const [myProject, setMyProject] = useState<Project | any>();
  const [loading, setIsLoading] = useState<Boolean>();
  const [errors, setErrors] = useState<string | any>();
  const [projects, setProjects] = useState<
    [users: { projectId: string }] | any
  >();
  const { user, setNotification, setProjectsIds, projectsIds } =
    useStateContext();

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setMyProject({ ...myProject, owner: user?._id });
    try {
      const response = await axiosClient.post("/projects", myProject);
      if (response.status == 200) {
        const newProjectIdObj: { projectId: string } = {
          projectId: response.data._id, // Assuming response.data._id is always a string
        };
        console.log(projectsIds);
        console.log(newProjectIdObj);
        setProjects(
          projectsIds?.map((proj: { projectId: string }) => ({
            users: {
              projectId: proj.projectId,
            },
          }))
        );

        setProjects({
          ...projects,
          users: { projectId: newProjectIdObj.projectId },
        });

        const addProject = await axiosClient.patch(
          `/users-projects/${user?._id}`,
          projects
        );
        if (addProject.status == 200) {
          setNotification("succefully added new project");
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

            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};
