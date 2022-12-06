import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import { omit } from 'lodash';
import UserModel from '../models/user.model';
import { IUserDocument, IUserInput } from '../interfaces/user.interface';

export async function createUser(input: IUserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function getUser(query: FilterQuery<IUserDocument>) {
  const user = UserModel.findOne(query).lean();
  return user;
}

export async function findAndUpdateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  options: QueryOptions = {}
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function validateEmail(email: string) {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return true;
  }

  return false;
}
