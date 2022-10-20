import { User } from './../interfaces/user.interface';
import { Token } from './../interfaces/token.interface';

export type UserLoginBody = Omit<User, 'name'>;
export type UserWithAuth = Omit<User, 'password'> | Omit<Token, 'expiresIn'>;
