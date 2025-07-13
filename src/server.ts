import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import sequelize from "@/infrasturcture/database/postgre";
import { authRouter } from "@/api/auth/authRouter";
import { UserInit } from "@/models/user";

const t = async () => {
  try {
    await sequelize.authenticate();
    await UserInit();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);
t();

// Request logging
app.use(requestLogger);

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
