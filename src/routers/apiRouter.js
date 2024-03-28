import express from "express";
import { joinUser, loginUser } from "../apis/userApiController";
import { editVideo, uploadVideo } from "../apis/videoApiController";

const apiRouter = express.Router();

apiRouter.post("/join", joinUser);
apiRouter.post("/login", loginUser);
apiRouter.post("/videos/upload", uploadVideo);
apiRouter.post("/videos/:id/edit", editVideo);

export default apiRouter;
