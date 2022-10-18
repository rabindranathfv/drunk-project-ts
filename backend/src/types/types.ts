import { User } from './../interfaces/user.interface';

export type UserLoginBody = Omit<User, 'name'>;
