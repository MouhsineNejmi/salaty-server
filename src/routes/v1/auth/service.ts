import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '@/config';
import { usersRepository } from '../users/repository';
import { UserDoc } from '@/models/user.model';
import { LoginDTO, RegisterDTO } from './schema';

import AuthenticationError from '@/errors/AuthenticationError';
import ValidationError from '@/errors/ValidationError';
import EntityNotFoundError from '@/errors/EntityNotFoundError';

interface AuthResponse {
  user: Omit<UserDoc, 'password'>;
  accessToken?: string;
  refreshToken?: string;
}

interface RefreshAuthResponse {
  accessToken: string;
  newRefreshToken: string;
}

export class AuthService {
  signAccessToken = (userId: string): string => {
    return jwt.sign({ id: userId }, config.jwtAccessSecret, {
      expiresIn:
        config.jwtAccessSecretExpiresIn as jwt.SignOptions['expiresIn'],
    });
  };

  signRefreshToken = (userId: string): string => {
    return jwt.sign({ id: userId }, config.jwtRefreshSecret, {
      expiresIn:
        config.jwtRefreshSecretExpiresIn as jwt.SignOptions['expiresIn'],
    });
  };

  async register(attrs: RegisterDTO): Promise<AuthResponse> {
    const { email, password } = attrs;

    const existingUser = await usersRepository.findByEmail(email);
    if (existingUser)
      throw new AuthenticationError({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersRepository.create({
      ...attrs,
      password: hashedPassword,
    });

    return { user: user as Omit<UserDoc, 'password'> };
  }

  async login(attrs: LoginDTO): Promise<AuthResponse> {
    const { email, password } = attrs;

    const user = await usersRepository.findByEmail(email);
    if (!user)
      throw new AuthenticationError({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new AuthenticationError({ message: 'Invalid email or password' });

    const accessToken = this.signAccessToken(user.id);
    const refreshToken = this.signRefreshToken(user.id);

    const updateUser = await usersRepository.update(user.id, { refreshToken });

    return {
      user: updateUser as Omit<UserDoc, 'password'>,
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<RefreshAuthResponse> {
    if (!refreshToken) throw new ValidationError({ message: 'Missing token' });

    const payload = jwt.verify(
      refreshToken,
      config.jwtRefreshSecret
    ) as JwtPayload;

    const user = await usersRepository.findById(payload.id!);

    if (!user || user?.refreshToken !== refreshToken) {
      throw new AuthenticationError({ message: 'Invalid refresh token' });
    }

    const accessToken = this.signAccessToken(user.id);
    const newRefreshToken = this.signRefreshToken(user.id);

    await usersRepository.update(user.id, { refreshToken: newRefreshToken });

    return { accessToken, newRefreshToken };
  }

  async logout(userId: string): Promise<void> {
    await usersRepository.update(userId, {
      refreshToken: null,
    });
  }

  async getMe(userId: string): Promise<Omit<UserDoc, 'password'>> {
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new EntityNotFoundError({ message: 'User not found' });
    }

    return user as Omit<UserDoc, 'password'>;
  }
}

export const authService = new AuthService();
