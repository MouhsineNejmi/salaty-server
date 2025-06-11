import 'module-alias/register';
import dotenv from 'dotenv';
import { createServer } from '@/server';
import config from '@/config';
import connectDB from '@/utils/db';

dotenv.config();

const server = createServer();

const start = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log('Error Connectiong to DB!');
  }

  server.listen(config.port, () => {
    console.log(`Server Listening on port ${config.port}`);
  });
};

start();
