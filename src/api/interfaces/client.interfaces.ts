import mongoose from 'mongoose';
import { IUserDocument } from './user.interface';

export interface IClientInput {
  user: IUserDocument['_id'];
  name: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  physiologicalState?: 'lack' | 'pregnancy' | 'lactation';
  email?: string;
  phoneNumber?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  expectedBodyWeight?: number;
  specificAims?: string[];
  pal: number;
}

export interface IClientDocument extends IClientInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
