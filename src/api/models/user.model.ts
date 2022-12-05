import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserDocument } from '../interfaces/user.interface';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  let user = this as IUserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
