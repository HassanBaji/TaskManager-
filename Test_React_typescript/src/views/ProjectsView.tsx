import React, { useState } from "react";
import { useStateContext } from "../ContextProvider";
import { Project } from "../model";
export const ProjectsView = () => {
  const { user } = useStateContext();
  const [myProjects, setMyProjects] = useState<Project[]>();

  return <div>ProjectsViewss</div>;
};
