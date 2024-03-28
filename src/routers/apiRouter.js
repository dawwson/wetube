import express from "express";
import { createUser } from "../apis/userApiController";
import { editVideo, uploadVideo } from "../apis/videoApiController";

const apiRouter = express.Router();

apiRouter.post("/users", createUser);
apiRouter.post("/videos/upload", uploadVideo);
apiRouter.post("/videos/:id/edit", editVideo);

export default apiRouter;
