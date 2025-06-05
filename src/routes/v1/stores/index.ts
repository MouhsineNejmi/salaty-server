import express, { Router } from 'express';
import { listStores } from './controller';
import authenticateUser from '../../../middlewares/authenticate-user.middleware';

const stores: Router = express.Router();

stores.use(authenticateUser);
stores.get('/', listStores);

export default stores;
