import dotenv from "dotenv";

dotenv.config();

const config = {
  db: {
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_BACKEND_USERNAME,
    password: process.env.DB_BACKEND_PASSWORD,
  },
};

export default config;
