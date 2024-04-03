import app from "./server";
import "./db";
import "./config";
import "./models/Video";
import "./models/User";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port http://localhost:${PORT} 🚀`);
});
