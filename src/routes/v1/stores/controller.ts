import { Request, Response } from 'express';
import Store from '@/models/store.model';

export const listStores = async (req: Request, res: Response) => {
  const stores = await Store.find({
    auth0Id: req.auth?.payload.sub,
  });
  res.status(200).json({ stores });
};
