import type { Request, RequestHandler, Response } from "express";
import { authService } from "./authService";

class AuthController {
  public register: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await authService.register(_req.body);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public login: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await authService.login(_req.body);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const authController = new AuthController();
