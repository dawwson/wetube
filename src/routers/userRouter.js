import express from "express";
import {
  changePassword,
  deleteUser,
  editUser,
  finishGithubLogin,
  logout,
  seeUserProfile,
  startGithubLogin,
} from "../controllers/userController";
import { publicOnlyMiddleware, userOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/github/login-start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/login-finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", userOnlyMiddleware, logout);
userRouter.get("/edit", userOnlyMiddleware, editUser);
userRouter.get("/change-password", userOnlyMiddleware, changePassword);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", seeUserProfile);
export default userRouter;
