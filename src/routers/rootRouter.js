import express from "express";

import { join, login } from "../controllers/userController";
import { searchVideo, home } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", join);
rootRouter.get("/login", login);
rootRouter.get("/search", searchVideo);

export default rootRouter;
