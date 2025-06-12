import { Types } from 'mongoose';
import Store, { StoreDoc, StoreAttrs } from '@/models/store.model';

interface IStoreRepository {
  findByUserId(userId: string): Promise<StoreDoc | null>;
}

class StoreRepository implements IStoreRepository {
  async findByUserId(userId: string): Promise<StoreDoc | null> {
    return await Store.findOne({ userId });
  }
}

export const storeRepository = new StoreRepository();
