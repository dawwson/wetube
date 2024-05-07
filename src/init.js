import config from "./config";
import app from "./server";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment";

app.listen(config.port, () => {
  console.log(
    `✅ Server is listening on port http://localhost:${config.port} 🚀`
  );
});
