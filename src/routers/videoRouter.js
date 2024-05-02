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
videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter.get("/:id([0-9a-f]{24})/edit", userOnlyMiddleware, editVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", userOnlyMiddleware, deleteVideo);

export default videoRouter;
