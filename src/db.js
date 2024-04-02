import mongoose from "mongoose";
import config from "./config";

const { username, password, port, database } = config.db;
// NOTE: authSource는 사용자 인증정보 collection(= users)를 가진 데이터베이스 이름을 지정합니다.
const mongoUri = `mongodb://${username}:${password}@127.0.0.1:${port}/${database}?authSource=admin`;

mongoose.connect(mongoUri, {
  autoCreate: true, // 모든 모델에 대한 콜렉션 자동 생성
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("❌ DB Error", error);
});

db.once("open", () => {
  console.log("✅ Connected to DB 🎉");
});
