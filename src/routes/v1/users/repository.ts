import { Types } from 'mongoose';
import User, { UserDoc, UserAttrs } from '@/models/user.model';
import EntityNotFoundError from '@/errors/EntityNotFoundError';

interface IUsersRepository {
  create(attrs: UserAttrs): Promise<UserDoc>;
  findById(id: string): Promise<UserDoc | null>;
  update(id: string, updates: Partial<UserDoc>): Promise<UserDoc>;
}

class UsersRepository implements IUsersRepository {
  async create(attrs: UserAttrs): Promise<UserDoc> {
    return await User.create(attrs);
  }

  async findById(id: string): Promise<UserDoc | null> {
    return await User.findById(new Types.ObjectId(id));
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    return await User.findOne({ email });
  }

  async update(id: string, updates: Partial<UserDoc>): Promise<UserDoc> {
    const updatedUser = await User.findByIdAndUpdate(
      new Types.ObjectId(id),
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!updatedUser)
      throw new EntityNotFoundError({ message: 'User not found' });

    return updatedUser;
  }
}

export const usersRepository = new UsersRepository();
