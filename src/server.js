import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();

const globalRouter = express.Router();

const handleHome = (req, res) => {
  res.send("Home");
};

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => {
  res.send("Edit User");
};

userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();

const handleVideoWatch = (req, res) => {
  res.send("Watch Video");
};

videoRouter.get("/watch", handleVideoWatch);

app.use(morgan("dev"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT} 🚀`);
});
