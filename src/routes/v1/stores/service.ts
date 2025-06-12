import { Types } from 'mongoose';
import { StoreDoc } from '@/models/store.model';
import { storeRepository } from './repository';

export class StoreService {
  async getStoreByUserId(id: string): Promise<StoreDoc[] | null> {
    return await storeRepository.findByUserId(id);
  }
}

export const storeService = new StoreService();
