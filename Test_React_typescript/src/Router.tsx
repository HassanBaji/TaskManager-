import { Navigate, createBrowserRouter, RouteObject } from "react-router-dom";
import { ReactElement } from "react";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import UserDefaultLayout from "./Components/UserDefaultLayout";
import { HomeView } from "./views/HomeView";
import { ProjectsView } from "./views/ProjectsView";
import { ProjectsFormView } from "./views/ProjectsFormView";
import { ProjectDashView } from "./views/ProjectDashView";
import { TaskView } from "./views/TaskView";
import { UsersView } from "./views/UsersView";
import TasksFormView from "./views/TasksFormView";

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
    element: <UserDefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <HomeView />,
      },
      {
        path: "/projects",
        element: <ProjectsView />,
      },
      {
        path: "/projects/new",
        element: <ProjectsFormView />,
      },
      {
        path: "/projects/dash/:id",
        element: <ProjectDashView />,
      },
      {
        path: "/projects/edit/:id",
        element: <ProjectsFormView />,
      },
      {
        path: "/tasks/:id",
        element: <TaskView />,
      },
      {
        path: "/users/:id",
        element: <UsersView />,
      },
    ],
  },

  // Add your existing routes here
];

const router = createBrowserRouter(routes);

export default router;
