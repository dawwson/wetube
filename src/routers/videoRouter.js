import express from "express";
import {
  deleteVideo,
  editVideo,
  uploadVideo,
  watchVideo,
} from "../controllers/videoController";
import { userOnlyMiddleware } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/upload", userOnlyMiddleware, uploadVideo);
videoRouter.get("/:id", watchVideo);
videoRouter.get("/:id/edit", userOnlyMiddleware, editVideo);
videoRouter.get("/:id/delete", userOnlyMiddleware, deleteVideo);

export default videoRouter;
