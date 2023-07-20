import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUserFromSessionToken,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/users/:token", isAuthenticated, getUserFromSessionToken);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
