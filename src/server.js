import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./config";
import { localsMiddleware } from "./middleware";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.cookieSecret,
    resave: false, // NOTE: session에 변경사항이 없으면 session을 다시 저장하지 않음
    saveUninitialized: false, // NOTE: session에 변경사항이 있을 때(로그인)만 저장함
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
    }),
  })
);
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // TODO: 파일 서버에 저장
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
