import express, { Router } from 'express';
import stores from './stores';

const v1: Router = express.Router();

v1.use('/stores', stores);

export default v1;
