import express from "express";
import { editUser, joinUser, loginUser } from "../apis/userApiController";
import { editVideo, uploadVideo } from "../apis/videoApiController";
import userOnlyMiddleware from "../middlewares/userOnlyMiddleware";
import publicOnlyMiddleware from "../middlewares/publicOnlyMiddleware";

const apiRouter = express.Router();

apiRouter.post("/join", publicOnlyMiddleware, joinUser);
apiRouter.post("/login", publicOnlyMiddleware, loginUser);
apiRouter.post("/users/edit", userOnlyMiddleware, editUser);
apiRouter.post("/videos/upload", uploadVideo);
apiRouter.post("/videos/:id/edit", editVideo);

export default apiRouter;
