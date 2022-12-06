import mongoose from 'mongoose';
import { IUserDocument } from './user.interface';

export interface ISessionDocument extends mongoose.Document {
  user: IUserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
