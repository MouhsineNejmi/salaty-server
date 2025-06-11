import { NextFunction, Request, Response } from 'express';
import config from '@/config';
import { getErrorMessage } from '@/utils';

import CustomError from '@/errors/CustomError';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';

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

  if (error instanceof UnauthorizedError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        statusCode: error.statusCode,
        code: 'code' in error ? error.code : 'ERR_AUTH',
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(error) ||
        'An error occured. Please view logs for more details',
    },
  });
};

export default errorHandler;
