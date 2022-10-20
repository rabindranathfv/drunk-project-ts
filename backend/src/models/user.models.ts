import { Schema, model, Document } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>({
  name: {
    type: String,
    requiered: true,
  },
  email: {
    type: String,
    requiered: true,
    unique: true,
  },
  password: {
    type: String,
    requiered: true,
  },
});

UserSchema.method('toJSON', function() {
  const { __v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});

const UserModel = model<User & Document>('User', UserSchema);

export default UserModel;
