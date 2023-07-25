import React, { useEffect, useState } from "react";
import { Project, User } from "../model";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UsersFormView } from "./UsersFormView";

export const UsersView = () => {
  const { id } = useParams();
  const [myProject, setMyProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changes, setChanges] = useState<boolean>(false);
  const [myUsers, setMyUsers] = useState<User[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const { setNotification, user } = useStateContext();

  const getUsers = async () => {
    setLoading(true);
    console.log(userIds);
    try {
      console.log("here");
      const usersData = await Promise.all(
        userIds.map(async (id: string) => {
          const response = await axiosClient.get(`/users-id/${id}`);
          return response.data;
        })
      );

      setMyUsers(usersData);
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
        setUserIds(
          myProjectRes.data.users.map((user: { userId: string }) => user.userId)
        );
        console.log(myProjectRes.data.users);
      } else {
        setNotification("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProject();
  }, [changes]);

  useEffect(() => {
    getUsers();
    if (myProject?.owner == user?._id) {
      setIsOwner(true);
    }
  }, [myProject]);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleDelete = async (userId: any) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    setLoading(true);
    const myUsersRemove = myUsers.filter((user) => user._id != userId);
    setMyUsers(myUsersRemove);
    const newUsers = myUsersRemove.map((user) => ({
      userName: user.username,
      userId: user._id,
    }));
    try {
      const postNewUsers = await axiosClient
        .patch(`projects-users/${id}`, { users: newUsers })
        .then((data) => {
          setNotification("User has been deleted succefully");
          setChanges(!changes);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
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
            <h1>{myProject?.name} Users</h1>
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
                <button onClick={toggleModal} className="btn btn-success">
                  Add User
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <div>
          {loading && <div className="text-center">Loading</div>}

          {!loading && myUsers && (
            <div className="row">
              {myUsers?.map((user) => (
                <div className="col-md-4 mb-4" key={user?._id}>
                  <div
                    className={`card border-success`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title fs-7">{user?.username}</h5>
                      <p className="card-text ">{user?.email}</p>
                    </div>
                    <div className="container text-center">
                      <button
                        onClick={() => handleDelete(user?._id)}
                        className="btn btn-sm btn-danger px-3"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!myUsers && !loading && <div>No Users Found</div>}
      </div>
      <UsersFormView
        onClose={toggleModal}
        show={showModal}
        myProject={myProject}
        userIds={userIds}
        setChanges={setChanges}
        changes={changes}
        setMyProject={setMyProject}
        setLoading={setLoading}
      />
    </div>
  );
};
