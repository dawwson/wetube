import express from "express";

import {
  changePassword,
  editUser,
  joinUser,
  loginUser,
} from "../controllers/userApiController";
import {
  addViews,
  createComment,
  editVideo,
  uploadVideo,
} from "../controllers/videoApiController";
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
  videoUploadMiddleware.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);
apiRouter.post("/videos/:id([0-9a-f]{24})/edit", userOnlyMiddleware, editVideo);
apiRouter.post("/videos/:id([0-9a-f]{24})/view", addViews);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
