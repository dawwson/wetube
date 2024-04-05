import express from "express";

import {
  changePassword,
  editUser,
  joinUser,
  loginUser,
} from "../apis/userApiController";
import { editVideo, uploadVideo } from "../apis/videoApiController";
import {
  avatarUploadMiddleware,
  publicOnlyMiddleware,
  userOnlyMiddleware,
  videoUploadMiddleware,
} from "../middleware";

const apiRouter = express.Router();

apiRouter.post("/join", publicOnlyMiddleware, joinUser);
apiRouter.post("/login", publicOnlyMiddleware, loginUser);
apiRouter.post(
  "/users/edit",
  userOnlyMiddleware,
  avatarUploadMiddleware.single("avatar"),
  editUser
);
apiRouter.post("/users/change-password", userOnlyMiddleware, changePassword);
apiRouter.post(
  "/videos/upload",
  userOnlyMiddleware,
  videoUploadMiddleware.single("video"),
  uploadVideo
);
apiRouter.post("/videos/:id/edit", userOnlyMiddleware, editVideo);

export default apiRouter;
