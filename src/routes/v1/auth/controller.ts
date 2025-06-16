import { NextFunction, Request, Response } from 'express';
import { authService } from './service';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken } = await authService.register(req.body);
      res.status(201).json({ user, accessToken });
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken } = await authService.login(req.body);
      res.json({ user, accessToken });
    } catch (error: any) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const { accessToken, newRefreshToken } = await authService.refresh(
        refreshToken
      );

      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.payload.sub!;
      await authService.logout(userId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.payload.sub!;

      const user = await authService.getMe(userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
