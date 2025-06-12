import express, { Router } from 'express';
import stores from './stores';
import auth from './auth';

const v1: Router = express.Router();

v1.use('/auth', auth);
v1.use('/stores', stores);

export default v1;
