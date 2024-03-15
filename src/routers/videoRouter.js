import express from "express";
import {
  deleteVideo,
  editVideo,
  watchVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/watch", watchVideo);
videoRouter.get("/edit", editVideo);
videoRouter.get("/delete", deleteVideo);

export default videoRouter;
