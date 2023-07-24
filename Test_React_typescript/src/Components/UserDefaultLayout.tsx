import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";
import { useEffect } from "react";
import "../index.css";
import { Project } from "../model";

const UserDefaultLayout: React.FC = () => {
  const { user, token, setUser, setToken, setProjectsIds, notification } =
    useStateContext();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchUser = async () => {
        try {
          const response = await axiosClient.get(`/users/${token}`);
          setUser(response.data);
          setProjectsIds(
            response.data.projects.map((projects: any) => ({
              projectId: projects.projectId,
            }))
          );
          //setProjectsIds(response.data.projects);
          console.log(response.data);
          console.log(response.data.projects);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchUser();
    }
  }, [token]);

  const onLogout = async () => {
    try {
      await axiosClient.post(`/auth/logout/${user?._id}`);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="defaultLayout">
        <aside>
          <Link to="/home"> Home</Link>
          <Link to="/projects"> Projects </Link>
        </aside>
        <div className="content">
          <header>
            <div>Better Notion</div>
            <div>
              {user?.username}
              <a href="#" onClick={onLogout} className="btn-logout">
                Logout
              </a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default UserDefaultLayout;
