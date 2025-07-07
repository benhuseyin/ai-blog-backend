import express, { type Router } from "express";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRouter: Router = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:id", userController.getUser);
