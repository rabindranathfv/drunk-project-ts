import { compare } from 'bcrypt';

import { HttpException } from '../exceptions/HttpException';
import { generateJWT } from '../helpers/jwt';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/user.models';
import { isEmpty } from '../utils/isEmpty';

class AuthService {
  public users = UserModel;
  constructor() {}

  public async logIn(userData: User) {
    try {
      if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

      const findUser: User | null = await this.users.findOne({ email: userData.email });
      if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

      const token = await generateJWT(findUser._id, findUser.name);

      return { findUser, token };
    } catch (error) {
      throw new Error('there is some troubles try to login');
    }
  }

  public async renewToken(id: string, name: string) {
    try {
      const newToken = await generateJWT(id, name);

      return newToken;
    } catch (error) {
      throw new Error('there is some troubles try to renew token');
    }
  }
}

export default AuthService;
