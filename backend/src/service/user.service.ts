import { hash } from 'bcrypt';

import { HttpException } from '../exceptions/HttpException';
// import { generateJWT } from '../helpers/jwt';
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
      // const token = await generateJWT(email, name);
      const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

      return createUserData;
    } catch (error) {
      throw new HttpException(500, `${error}`);
    }
  }
}

export default UserService;
