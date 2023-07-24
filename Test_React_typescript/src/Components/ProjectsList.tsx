import React, { useEffect, useState } from "react";
import { Project } from "../model";
import { useStateContext } from "../ContextProvider";
import { useNavigate } from "react-router-dom";

interface Props {
  myProjects: Project[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectsList: React.FC<Props> = ({ myProjects, setLoading }) => {
  const [myOwnProjects, setMyOwnProjects] = useState<Project[]>();
  const [allProjects, setAllProjects] = useState<Project[]>();
  const { user } = useStateContext();
  const navigate = useNavigate();

  const sortProjects = () => {
    const myProjectsCopy = [...myProjects];
    const myProjectsFilter = myProjectsCopy.filter(
      (project) => project.owner === user?._id
    );
    setMyOwnProjects(myProjectsFilter);

    const allProjectsFilter = myProjectsCopy.filter(
      (project) => project.owner !== user?._id
    );
    setAllProjects(allProjectsFilter);
  };

  useEffect(() => {
    sortProjects();
    setLoading(false);
  }, [user]);

  const handleProjectCardClick = (projectId: string | any) => {
    navigate(`/projects/dash/${projectId}`);
  };

  return (
    <div>
      <div>
        <div>
          <div className="row">
            {myOwnProjects?.map((project) => (
              <div className="col-md-4 mb-4" key={project._id}>
                <div
                  className="card border-success"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProjectCardClick(project._id)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="row">
            {allProjects?.map((project) => (
              <div className="col-md-4 mb-4" key={project._id}>
                <div
                  className="card border-warning"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProjectCardClick(project._id)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
