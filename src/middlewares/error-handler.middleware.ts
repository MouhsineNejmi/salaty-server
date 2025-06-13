import { NextFunction, Request, Response } from 'express';
import config from '@/config';
import { getErrorMessage } from '@/utils';

import CustomError from '@/errors/CustomError';

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent || config.debug) {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: getErrorMessage(error) || 'Something went wrong',
    },
  });
};

export default errorHandler;
