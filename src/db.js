import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.mongoUrl, {
  autoCreate: true, // 모든 모델에 대한 콜렉션 자동 생성
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("❌ DB Error", error);
});

db.once("open", () => {
  console.log("✅ Connected to DB 🎉");
});
