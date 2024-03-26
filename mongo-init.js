// NOTE: 보안을 위해 백엔드에서 접속하기 위한 사용자 생성
const database = process.env.DB_DATABASE;
const backendUsername = process.env.DB_BACKEND_USERNAME;
const backendPassword = process.env.DB_BACKEND_PASSWORD;

db.createUser({
  user: backendUsername,
  pwd: backendPassword,
  roles: [
    {
      role: "readWrite",
      db: database,
    },
  ],
});
