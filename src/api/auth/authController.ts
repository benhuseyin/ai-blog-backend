import type { Request, RequestHandler, Response } from "express";
import { authService } from "./authService";
import { generateAccessToken } from "@/utils/token";
class AuthController {
  public register: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await authService.register(_req.body);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public login: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await authService.login(_req.body);
    if (serviceResponse.success) {
      const token = generateAccessToken({
        id: serviceResponse.responseObject?.id,
        email: serviceResponse.responseObject?.email,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });
    }

    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const authController = new AuthController();
