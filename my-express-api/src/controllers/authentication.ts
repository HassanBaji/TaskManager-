import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random } from "../helpers";
import { authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    const expectedHash = authentication(user.authentication.salt, password);

    if (expectedHash != user.authentication.password) {
      res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AUTH-TOKEN", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    console.log("heree");
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      console.log("here");
      console.log(email + password + username);
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log("hereee");
      return res.sendStatus(406);
    }

    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      projects: [],
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
