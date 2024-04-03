import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT),
  cookieSecret: process.env.COOKIE_SECRET,
  mongoUrl: process.env.MONGO_URL,
  githubClientId: process.env.GITHUB_CLIENT_ID,
};

export default config;
