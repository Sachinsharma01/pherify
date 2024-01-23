import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT ?? 5050,
  database: {
    name: process.env.DB_NAME ?? "test",
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER ?? "root",
    host: process.env.DB_HOST,
  },
  logs: {
    level: process.env.LOG_LEVEL ?? "silly",
  },
  jwtSecret: process.env.SECRET_KEY ?? '',
  tokenExpiration: process.env.TOKEN_EXPIRATION ?? '1h',
};
