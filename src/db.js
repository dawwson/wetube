import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbName = process.env.DB_DATABASE;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_BACKEND_USERNAME;
const dbPassword = process.env.DB_BACKEND_PASSWORD;

// NOTE: authSource는 사용자 인증정보 collection(= users)를 가진 데이터베이스 이름을 지정합니다.
const mongoUri = `mongodb://${dbUser}:${dbPassword}@127.0.0.1:${dbPort}/${dbName}?authSource=admin`;

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
