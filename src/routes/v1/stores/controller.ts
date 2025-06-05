import { Request, Response } from 'express';
import EntityNotFoundError from '../../../errors/EntityNotFoundError';

export const listStores = (req: Request, res: Response) => {
  throw new EntityNotFoundError({
    message: 'No Stores Found!',
  });
  res.status(200).json([]);
};
