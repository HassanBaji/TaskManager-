import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUserFromSessionToken,
  addProjectToUser,
  getUserFromId,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/users/:token", isAuthenticated, getUserFromSessionToken);
  router.get("/users-id/:id", isAuthenticated, getUserFromId);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
  router.patch("/users-projects/:id", isAuthenticated, addProjectToUser);
};
