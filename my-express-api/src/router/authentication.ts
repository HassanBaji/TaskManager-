import express from "express";
import { login, logout, register } from "../controllers/authentication";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout/:id", logout);
};
