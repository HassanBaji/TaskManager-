import express from "express";
import authentication from "./authentication";
import users from "./users";
import test from "./test";
import todos from "./todos";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  test(router);
  todos(router);
  return router;
};
