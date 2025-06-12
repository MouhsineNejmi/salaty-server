import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '@/config';
import { usersRepository } from '@/routes/v1/users/repository';
import AuthenticationError from '@/errors/AuthenticationError';

interface JwtPayload {
  id: Types.ObjectId;
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError({
      message: 'Authorization header missing or malformed',
      statusCode: 401,
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.appSecret) as JwtPayload;
    const user = await usersRepository.findById(decoded.id);
    if (!user)
      throw new AuthenticationError({
        message: 'User Not Found!',
        statusCode: 40,
      });

    req.auth = { payload: { sub: String(decoded.id), ...decoded }, token };

    next();
  } catch (error) {
    throw new AuthenticationError({
      message: 'You are allowed to perform this action',
      statusCode: 403,
    });
  }
};

export default authenticateUser;
