import express, { Router } from 'express';
import { storeController } from './controller';
import authenticateUser from '@/middlewares/authenticate-user.middleware';

const stores: Router = express.Router();

stores.use(authenticateUser);
stores.get('/', storeController.listStoresByAuth0Id);

export default stores;
