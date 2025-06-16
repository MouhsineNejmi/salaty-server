import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '@/config';
import { usersRepository } from '@/routes/v1/users/repository';
import AuthenticationError from '@/errors/AuthenticationError';
import EntityNotFoundError from '@/errors/EntityNotFoundError';

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!config.jwtAccessSecret) {
    throw new AuthenticationError({
      message: 'JWT access secret is not configured',
      statusCode: 500,
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError({
      message: 'Missing or invalid authorization header',
      statusCode: 401,
    });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, config.jwtAccessSecret) as {
      id: string;
    };
    const user = await usersRepository.findById(decoded.id);
    if (!user)
      throw new EntityNotFoundError({
        message: 'User not found',
        statusCode: 401,
      });

    req.auth = {
      payload: { sub: String(decoded.id), ...decoded },
      accessToken,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
