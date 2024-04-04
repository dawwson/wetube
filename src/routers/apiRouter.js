import express from "express";

import { editUser, joinUser, loginUser } from "../apis/userApiController";
import { editVideo, uploadVideo } from "../apis/videoApiController";
import { publicOnlyMiddleware, userOnlyMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.post("/join", publicOnlyMiddleware, joinUser);
apiRouter.post("/login", publicOnlyMiddleware, loginUser);
apiRouter.post("/users/edit", userOnlyMiddleware, editUser);
apiRouter.post("/videos/upload", userOnlyMiddleware, uploadVideo);
apiRouter.post("/videos/:id/edit", userOnlyMiddleware, editVideo);

export default apiRouter;
