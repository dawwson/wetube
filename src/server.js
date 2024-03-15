import express from "express";
import morgan from "morgan";

const PORT = 4000;
const loggerMiddleware = morgan("devs");

const app = express();
app.use(loggerMiddleware);

app.get("/", (req, res, next) => {
  return res.end();
});

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT} 🚀`);
});
