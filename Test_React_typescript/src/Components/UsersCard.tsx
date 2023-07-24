import React, { useEffect } from "react";
import { Project } from "../model";
import { useNavigate } from "react-router-dom";

interface Props {
  users: any;
  _id: any;
  myProject: Project | undefined;
}
export const UsersCard: React.FC<Props> = (myProject) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(myProject._id);
  });
  const goToUsers = () => {
    navigate(`/users/${myProject._id}`);
  };

  return (
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
  );
};
