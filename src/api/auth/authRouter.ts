import express, { type Router } from "express";
import { authController } from "./authController";

export const authRouter: Router = express.Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authController.login);
