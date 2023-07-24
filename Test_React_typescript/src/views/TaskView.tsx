import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tasks, Project } from "../model";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";

export const TaskView = () => {
  const { id } = useParams();
  const [myTasks, setMyTasks] = useState<Tasks[]>([]);
  const [myProject, setMyProject] = useState<Project | any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksIds, setTasksIds] = useState<string[]>();
  const { setNotification } = useStateContext();

  useEffect(() => {
    getMyProject();
  }, []);

  const getTasks = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getMyProject = async () => {
    try {
      const myProjectRes = await axiosClient.get(`/projects/${id}`);
      if (myProjectRes.status == 200) {
        setMyProject(myProjectRes.data);
        setTasksIds(myProjectRes.data.tasks);
        console.log(myProjectRes.data.tasks);
        setLoading(false);
      } else {
        setNotification("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>TaskView</div>;
};
