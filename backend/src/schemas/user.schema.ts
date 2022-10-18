import { object, string } from 'yup';

export const UserSchema = object({
  body: object({
    name: string().required('name is a required field'),
    email: string().email('Not a valid email').required('email is a required field'),
    password: string()
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
      .required('password is a required field'),
  }),
});
