import { NextFunction, Request, Response } from 'express';
import { authService } from './service';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await authService.register(req.body);
      res.status(201).json({ user, token });
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ user, token });
    } catch (error: any) {
      next(error);
    }
  }
}

export const authController = new AuthController();
