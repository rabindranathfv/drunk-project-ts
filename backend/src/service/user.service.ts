import { hash } from 'bcrypt';

import { HttpException } from '../exceptions/HttpException';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.models';
import { isEmpty } from '../utils/isEmpty';

class UserService {
  public users = UserModel;

  constructor() {}

  public async createUser(userData: User): Promise<User> {
    try {
      if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
      const { email, password } = userData;

      const findUser: User | null = await this.users.findOne({ email });
      if (findUser) throw new HttpException(409, `This email ${email} already exists`);

      const hashedPassword = await hash(password, 10);
      const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

      return createUserData;
    } catch (error) {
      throw new HttpException(500, `${error}`);
    }
  }

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User | null = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const findUser: User | null = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User | null = await this.users.findByIdAndUpdate({ _id: userId }, userData, { new: true });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User | null = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
