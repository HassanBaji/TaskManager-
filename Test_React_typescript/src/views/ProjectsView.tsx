import React, { useState } from "react";
import { useStateContext } from "../ContextProvider";
import { Project } from "../model";
import { ProjectsList } from "../Components/ProjectsList";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { getProjects } from "../../../my-express-api/src/db/projects";

export const ProjectsView = () => {
  const { user, projectsIds } = useStateContext();
  const [myProjects, setMyProjects] = useState<Project[]>();

  // const getProjects = async () => {
  const projectsArray: any = projectsIds?.map(
    (project: { projectId: string }) => {
      project.projectId;
    }
  );

  // projectsArray.forEach(async (element: any) => {
  //   const response = await axiosClient.get(`/projects/${element}`);
  //   setMyProjects(...myProjects, response.data)
  //   });

  // };

  const getProjects = async () => {
    console.log(projectsIds);

    if (!projectsIds) return; // Ensure projectsIds is not undefined or null
    try {
      const projectsData = await Promise.all(
        projectsIds.map(async (project: { projectId: string }) => {
          const response = await axiosClient.get(
            `/projects/${project.projectId}`
          );
          return response.data;
        })
      );
      setMyProjects(projectsData);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [user]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Projects</h1>
        <Link to="/projects/new" className="btn-add">
          create new
        </Link>
      </div>
      <div>
        <div>
          {myProjects && <ProjectsList myProjects={myProjects} />}

          {!myProjects && <div>No projects found</div>}
        </div>
      </div>
    </div>
  );
};
