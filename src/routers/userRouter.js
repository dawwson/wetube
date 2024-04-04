import express from "express";
import {
  deleteUser,
  editUser,
  finishGithubLogin,
  logout,
  seeUser,
  startGithubLogin,
} from "../controllers/userController";
import userOnlyMiddleware from "../middlewares/userOnlyMiddleware";
import publicOnlyMiddleware from "../middlewares/publicOnlyMiddleware";

const userRouter = express.Router();

userRouter.get("/github/login-start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/login-finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", userOnlyMiddleware, logout);
userRouter.get("/edit", userOnlyMiddleware, editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", seeUser);
export default userRouter;
