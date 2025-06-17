import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import EntityNotFoundError from '@/errors/EntityNotFoundError';
import { storeService } from './service';

export class StoreController {
  async listStoresByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = await storeService.getStoreByUserId(
        req.auth?.payload.sub!
      );

      if (!stores) {
        throw new EntityNotFoundError({ message: 'You have no stores!' });
      }

      res.status(200).json({ stores });
    } catch (error) {
      next(error);
    }
  }
}

export const storeController = new StoreController();
