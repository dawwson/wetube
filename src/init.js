import app from "./server";
import "./db";
import "./models/Video";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port http://localhost:${PORT} 🚀`);
});
