import React, { useEffect, useState } from "react";
import { Project, Tasks } from "../model";
interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  myTasks: Tasks[];
}
export const TasksList: React.FC<Props> = ({ setLoading, myTasks }) => {
  const openTask = (id: string) => {};

  return (
    <div>
      {myTasks.length > 0 && (
        <div className="row">
          {myTasks?.map((task) => (
            <div className="col-md-4 mb-4" key={task._id}>
              <div
                className={`card ${
                  task.status === "ongoing"
                    ? "border-warning"
                    : task.status === "completed"
                    ? "border-success"
                    : "border-danger"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => openTask(task._id)}
              >
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
