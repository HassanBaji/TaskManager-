import { Navigate, createBrowserRouter, RouteObject } from "react-router-dom";
import { ReactElement } from "react";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import { TasksView } from "./views/TasksView";

const routes: RouteObject[] = [
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/",
    element: <TasksView />,
  },
  // Add your existing routes here
];

const router = createBrowserRouter(routes);

export default router;
