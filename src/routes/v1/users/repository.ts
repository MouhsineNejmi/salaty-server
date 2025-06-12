import { Types } from 'mongoose';
import User, { UserDoc, UserAttrs } from '@/models/user.model';

interface IUsersRepository {
  create(attrs: UserAttrs): Promise<UserDoc>;
  findById(id: Types.ObjectId): Promise<UserDoc | null>;
}

class UsersRepository implements IUsersRepository {
  async create(attrs: UserAttrs): Promise<UserDoc> {
    return await User.create(attrs);
  }

  async findById(id: Types.ObjectId): Promise<UserDoc | null> {
    return await User.findById(id);
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    return await User.findOne({ email });
  }
}

export const usersRepository = new UsersRepository();
