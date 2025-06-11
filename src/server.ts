import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import config from '@/config';
import v1 from '@/routes/v1';
import errorHandler from '@/middlewares/error-handler.middleware';

export const createServer = () => {
  const app: Express = express();
  app
    .use(helmet())
    .use(express.json())
    .use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        message: 'Too many requests, please try again later.',
        validate: { positiveHits: false },
      })
    )
    .use(cors({ origin: '*' }));

  app.get('/health', (req: Request, res: Response) => {
    res.json({ ok: true, environment: config.env });
  });

  app.use('/api/v1', v1);
  app.use(errorHandler);

  return app;
};
