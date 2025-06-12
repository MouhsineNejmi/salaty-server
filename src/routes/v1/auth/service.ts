import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { usersRepository } from '../users/repository';
import { UserAttrs, UserDoc } from '@/models/user.model';
import ConflictError from '@/errors/ConflictError';
import EntityNotFoundError from '@/errors/EntityNotFoundError';
import ValidationError from '@/errors/ValidationError';
import config from '@/config';

interface AuthResponse {
  user: UserDoc;
  token: string;
}

export class AuthService {
  async register(attrs: UserAttrs): Promise<AuthResponse> {
    const existingUser = await usersRepository.findByEmail(attrs.email);
    if (existingUser)
      throw new ConflictError({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(attrs.password, 10);
    const user = await usersRepository.create({
      ...attrs,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, config.appSecret, {
      expiresIn: '7d',
    });

    return { user, token };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await usersRepository.findByEmail(email);
    if (!user)
      throw new EntityNotFoundError({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ValidationError({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, config.appSecret, {
      expiresIn: '7d',
    });

    return { user, token };
  }
}

export const authService = new AuthService();
