import express from "express";

import { join, login } from "../controllers/userController";
import { searchVideo, home } from "../controllers/videoController";
import publicOnlyMiddleware from "../middlewares/publicOnlyMiddleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", publicOnlyMiddleware, join);
rootRouter.get("/login", publicOnlyMiddleware, login);
rootRouter.get("/search", searchVideo);

export default rootRouter;
