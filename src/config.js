import dotenv from "dotenv";

dotenv.config();

const config = {
  cookieSecret: process.env.COOKIE_SECRET,
  mongoUrl: process.env.MONGO_URL,
};

export default config;
