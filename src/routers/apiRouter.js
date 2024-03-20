import express from "express";
import { editVideo, uploadVideo } from "../apis/videoApiController";

const apiRouter = express.Router();

apiRouter.post("/videos/upload", uploadVideo);
apiRouter.post("/videos/:id/edit", editVideo);

export default apiRouter;
