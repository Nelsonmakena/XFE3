import dotenv from "dotenv";
dotenv.config();
export const ENV = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
