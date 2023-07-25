import React, { useEffect, useState } from "react";
import { Project, User } from "../model";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import { useStateContext } from "../ContextProvider";
export const UsersFormView: React.FC<{
  show: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  myProject?: Project;
  setChanges: React.Dispatch<React.SetStateAction<boolean>>;
  changes: boolean;
  setMyProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  userIds?: string[] | any[];
}> = ({
  show,
  onClose,
  myProject,
  setMyProject,
  setChanges,
  changes,
  userIds = [],
  setLoading,
}) => {
  const { id } = useParams();
  const [errors, setErrors] = useState<string[] | any>([]);
  const { setNotification } = useStateContext();
  const [user, setUser] = useState<{
    userName: string | any;
    userId?: string | any;
  }>();
  const [users, setUsers] = useState<User[]>();
  const [usersFilter, setUsersFilter] = useState<User[]>();

  const getUsers = async () => {
    try {
      const usersResponse = await axiosClient.get("users");
      setUsers(usersResponse.data);
      setUsersFilter(
        users?.filter(
          (user) => !userIds.includes(user._id) && user._id !== myProject?.owner
        )
      );
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  const postUser = async () => {
    const allUsers = myProject?.users?.map(
      (user: { userId: string; userName: string }) => ({
        userId: user.userId,
        userName: user.userName,
      })
    );

    allUsers?.push({ userId: user?.userId, userName: user?.userName });

    try {
      onClose();
      setLoading(true);
      const postUserToProject = axiosClient
        .patch(`projects-users/${id}`, { users: allUsers })
        .then((data) => {
          const myUser = users?.find((thisUser) => {
            thisUser?._id == user?.userId;
          });

          const allProjects = myUser?.projects ?? [];
          allProjects?.push({ projectId: id });

          const addProjectToUser = axiosClient
            .patch(`/users-projects/${user?.userId}`, {
              projects: allProjects,
            })

            .then((data) => {
              setNotification("User added");
              setChanges(!changes);
              setLoading(false);
            });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setNotification("Somethign went wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, [userIds]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    console.log("here");
    postUser();
  };

  return (
    <div>
      <div
        className={`modal ${show ? "d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Task</h5>
              <button type="button" className="close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {errors.length > 0 && (
                <div className="alert alert-danger">
                  {errors.map(
                    (
                      error:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <p key={index}>{error}</p>
                    )
                  )}
                </div>
              )}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>User:</label>
                  <select
                    onChange={(ev) =>
                      setUser({
                        userName: ev.target.value,
                        userId:
                          ev.target.options[
                            ev.target.selectedIndex
                          ].getAttribute("data-key"),
                      })
                    }
                    className="form-control"
                  >
                    <option value="">Select a user</option>
                    {usersFilter?.map((user) => (
                      <option
                        key={user._id}
                        value={user.username}
                        data-key={user._id}
                      >
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
