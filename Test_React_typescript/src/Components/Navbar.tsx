import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateContext } from "../ContextProvider";

export const Navbar = () => {
  const { user, setUser, setToken } = useStateContext();
  const logout = () => {
    setUser("");
    setToken("");
  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">{user} Task Manager</a>
          <form className="d-flex" role="search" onSubmit={logout}>
            <button className="btn btn-outline-danger" type="submit">
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
