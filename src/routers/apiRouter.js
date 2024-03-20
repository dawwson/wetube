import express from "express";
import { editVideo } from "../apis/videoApiController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id/edit", editVideo);

export default apiRouter;
