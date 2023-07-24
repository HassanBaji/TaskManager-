import React from "react";
import { Project } from "../model";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface Props {
  tasks: any;
  _id: any;
  myProject: Project | undefined;
}
export const TasksCard: React.FC<Props> = (myProject) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(myProject._id);
  });
  const goToTasks = () => {
    navigate(`/tasks/${myProject._id}`);
  };
  return (
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
  );
};
