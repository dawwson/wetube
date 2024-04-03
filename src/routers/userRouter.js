import express from "express";
import {
  deleteUser,
  editUser,
  finishGithubLogin,
  logout,
  seeUser,
  startGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/login-start", startGithubLogin);
userRouter.get("/github/login-finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", seeUser);
export default userRouter;
